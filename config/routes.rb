Rails.application.routes.draw do
  root to: 'site#index'

  namespace :api do
    namespace :v1 do
      resources :projects, only: [:index, :create, :destroy, :update, :show]
      resources :tasks, only: [:create, :destroy, :update, :show]
    end
  end

  get '*path', to: 'site#index'
end
