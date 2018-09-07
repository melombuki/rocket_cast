Rails.application.routes.draw do
  namespace :api do
    post 'authenticate', to: 'authentication#authenticate'
  end
end
