# frozen_string_literal: true

class APIController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include AuthConcern

  before_action :authenticate_user

  protect_from_forgery with: :exception

  # https://api.rubyonrails.org/classes/ActiveSupport/Rescuable/ClassMethods.html
  # documentation about #rescue_from
  rescue_from JWT::DecodeError, with: :invalid_token
  rescue_from InvalidToken, with: :invalid_token

  def current_user
    p '#current_user'
    @current_user ||= User.find decoded_token['user_id']
  end
end
