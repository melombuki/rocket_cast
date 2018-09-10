class Api::PodcastsController < ApiController
  require 'uri'

  def create
    url = params[:podcast][:url].strip
    
    if website_url_format_valid? url
      ActiveRecord::Base.transaction do
        podcast = nil
        podcast = updatePodcastFromUrl(url)
        
        if !podcast
          flash[:error] = "There was an error with that podcast, try a different url."
          return
        end
        
        # If the user is already subscribed, there is nothing to do
        subscriptions = Subscription.where("user_id = ?", current_user.id)
        subscriptions = subscriptions.collect{|s| s.podcast_id}
        if subscriptions.include?(podcast.id)
          flash[:error] = "You are already subscribed to that podcast."
          return
        end
        
        subscription = Subscription.new
        subscription.podcast_id = podcast.id
        subscription.user_id = current_user.id
        
        if !subscription.save
          flash[:error] = "That was not a valid url, check and try again later."
          return
        end
      end
    else
      flash[:error] = "That was not a valid url, check and try again later."
    end
  end

  def update
    subscriptions = Subscription.where("user_id = ?", current_user.id)
    subscriptions = subscriptions.collect{|s| s.podcast_id}
    subscriptions.each { |s| 
      p = updatePodcast(Podcast.where("id = ?", s).first)
    }
    redirect_to api_podcasts_path
  end

  private

  def updatePodcastFromUrl(url)

    podcast = nil
    
    podcast = Podcast.find_by(url: url)
    if !podcast
        podcast = Podcast.new
        podcast.url = url
        podcast.date_created = Time.now
    end

    podcast = updatePodcast(podcast)
    
    return podcast
  end

  def updatePodcast(podcast)

    syndFeed = Feedjira::Feed.fetch_and_parse podcast.url #, if_modified_since: 
    
    if !syndFeed
      return nil
    end
    
    # This is not a simple text rss reader, bail if format is not supported
    if !(syndFeed.class == Feedjira::Parser::ITunesRSS || 
      syndFeed.class == Feedjira::Parser::RSSFeedBurner ||
      syndFeed.class == Feedjira::Parser::RSS)
      flash[:error] = 'This application does not support this feed format at the moment. Sorry, please choose a different url.'
      return nil
    end

    if syndFeed.entries.blank?
      flash[:error] = 'There are no feeds for this podcast. Sorry, please choose a different url.'
      return nil
    end

    # Get all information for the podcast from the feed
    if syndFeed.instance_variable_get("@itunes_author")
      podcast.author = syndFeed.itunes_author
    else
      podcast.author = "Author not listed"
    end
    
    if syndFeed.instance_variable_get("@description")
      podcast.description = syndFeed.description
    else
      podcast.description = "No description"
    end
    
    if syndFeed.instance_variable_get("@itunes_image")
      podcast.image = syndFeed.itunes_image
    else
      podcast.image = ""
    end
    
    if syndFeed.etag != "" 
      podcast.last_etag = syndFeed.etag
    else
      podcast.last_etag = Time.now
    end
    
    podcast.last_modified = syndFeed.last_modified
    podcast.title = syndFeed.title
    podcast.link = syndFeed.url
    
    if syndFeed.instance_variable_get("@itunes_subtitle")
      podcast.subtitle = syndFeed.itunes_subtitle
    else
      podcast.subtitle = "No subtitle"
    end
    
    podcast.last_updated = Time.now
    
    if !podcast.save
      flash[:error] = 'There was an error saving the podcast. Please try again later.'
      return nil
    end
    
    # Store all usable entries before saving them all in order to check for at least one
    entries = []
    
    # Add all entries to the podcast
    syndFeed.entries.each { |syndEntry|

      entry = Entry.new
      entry.podcast_id = podcast.id
      
      if syndEntry.instance_variable_get('@url')
        entry.guid = syndEntry.url.strip
      else
        entry.guid = ""
      end
      
      if syndEntry.class == Feedjira::Parser::ITunesRSSItem
        if syndEntry.instance_variable_get('@enclosure_url') && syndEntry.enclosure_url != ""
          entry.file = syndEntry.enclosure_url
        else
          next
        end
      elsif syndEntry.class == Feedjira::Parser::RSSFeedBurnerEntry ||
        syndEntry.class == Feedjira::Parser::RSSEntry
        if syndEntry.instance_variable_get('@image') && syndEntry.image != ""
          entry.file = syndEntry.image
        else
          next
        end
      else
        next
      end

      if syndEntry.instance_variable_get('@published')
         entry.published_date = syndEntry.published
      else
         entry.published_date = Time.now
      end
       
      if syndEntry.instance_variable_get('@title')
        entry.title = syndEntry.title
      else
        entry.title = ""
      end
      
      if syndEntry.instance_variable_get('@summary')
        entry.summary = syndEntry.summary
      else
        entry.summary = ""
      end
      
      entry.last_updated = Time.now
      
      if !entry.date_created
        entry.date_created = Time.now
      end
      
      entries << entry
    }
    
    if entries.blank?
      flash[:error] = 'There were no entries that could be read. Please try again later.'
      podcast.destroy
      return nil
    else
      entries.each { |entry|
        if !entry.save
          flash[:error] = "There was an error saving the entry #{entry.title}. Please try updating again later."
        end
      }
    end
    
    return podcast
  end
    
  def podcast_params
    params.require(:podcast).permit(:url)
  end
  
  def destroy_and_return_nil(podcast)
    Entry.where("podcast_id = ?", podcast.id).destroy_all
    podcast.destroy
    return nil
  end
  
  # Returns true if the current user has a subscription to this podcast
  def is_subscribed?(podcastID)
    has_id = Subscription.where("user_id = ? AND podcast_id = ?", current_user.id, podcastID)
    has_id.any?
  end
  
  def website_url_format_valid?(url)
    uri = URI.parse(url)
    uri.kind_of?(URI::HTTP)
    rescue URI::InvalidURIError
     false
 end
end
