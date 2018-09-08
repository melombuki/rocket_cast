class Api::EntryResource < JSONAPI::Resource
  attributes :guid, :published_date, :summary, :title, :file
  has_one :podcast
end
