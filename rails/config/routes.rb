Rails.application.routes.draw do
  post :authenticate, to: 'authentication#authenticate'

  namespace :api do
    jsonapi_resources :podcasts, except: [:new, :edit, :update] do
      jsonapi_relationships
    end
  end
end
