# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api, module: :api, constraints: { format: 'json' } do
    scope :v1, module: :v1 do
      # We are defining the controllers paths avoiding to search them from an `api`
      # folder.
      devise_for :users, controllers: {
        confirmations: 'users/confirmations',
        passwords: 'users/passwords',
        registrations: 'users/registrations',
        sessions: 'sessions',
        unlocks: 'users/unlocks'
      }

      resources :users
    end
  end

  # ~~~~ Devise URL overrides ~~~~
  #
  # Override the Devise confirmation URL so that it doesn't include the `/api/`
  # part of the URL since the `devise_for` is included in the `:api` scope.
  # (See above)
  get '/users/:id/confirmation', to: 'pages#home', as: :confirmation
  get '/users/:id/password/edit', to: 'pages#home', as: :edit_password
  get '/users/:id/unlock', to: 'pages#home', as: :unlock

  root 'pages#home'
  get '*path' => 'pages#home'
end
