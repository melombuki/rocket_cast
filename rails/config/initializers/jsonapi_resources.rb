JSONAPI.configure do |config|
  # built in paginators are :none, :offset, :paged
  config.default_paginator = :paged

  config.default_page_size = 10
  config.maximum_page_size = 20

  config.exception_class_whitelist = [ApplicationController::NotAuthorizedError]
end