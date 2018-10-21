Rails.application.routes.draw do
  root to: 'site#index'
  get '/auth/check_for_user', to: 'auth#check_for_user'
  devise_for :users,
             :controllers => {sessions: 'sessions', registrations: 'registrations'}
  namespace :api do
    namespace :v1 do
      resources :projects, only: [:index, :create, :destroy, :update, :show]
      resources :tasks do

      end
    end
  end

  get '*path', to: 'site#index'
end
