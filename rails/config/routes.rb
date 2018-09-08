Rails.application.routes.draw do
  namespace :api do
    post 'authenticate', to: 'authentication#authenticate'
    get 'items', to: 'items#index'
  end
end
