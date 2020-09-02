# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#home'

  get '*path' => 'pages#home'
end
