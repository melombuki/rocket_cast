Rails.application.routes.draw do
  
  namespace :api do
    post :authenticate, to: 'authentication#authenticate'
    patch :podcasts, to: 'podcasts#update'
    jsonapi_resources :podcasts, except: [:new, :edit, :update] do
      jsonapi_relationships
    end
  end
end
