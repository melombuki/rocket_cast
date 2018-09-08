class Api::PodcastResource < JSONAPI::Resource
  attributes :author, :description, :image, :title, :url, :link, :subtitle
  has_many :entries

  def self.records(options = {})
    context = options[:context]
    subscriptions = Subscription.where("user_id = ?", context[:current_user].id)
    subscriptions = subscriptions.collect{|s| s.podcast_id}
    Podcast.where(id: subscriptions)
  end
end