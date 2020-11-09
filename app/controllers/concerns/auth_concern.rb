# frozen_string_literal: true

require 'active_support/concern'

module AuthConcern
  extend ActiveSupport::Concern
  class InvalidToken < StandardError; end

  def create_jwt_with(data)
    token = JwtConcern.encode(data)
    expiration ||= ENV['JWT_EXPIRATION_HOURS']
    cookies.signed[:jwt] = {
      value: token,
      httponly: true,
      expires: expiration.to_i.hours.from_now
    }
  end

  private

  def jwt_token
    cookies.signed[:jwt]
  end

  def decoded_token
    JwtConcern&.decode(jwt_token)
  end

  def authenticate_user
    raise InvalidToken unless valid_token? && current_user
  end

  def invalid_token
    render json: { message: 'Invalid Credentials', code: 401 },
           status: :unauthorized
  end

  def valid_token?
    jwt_token.present? && decoded_token && user_id?
  end

  def user_id?
    decoded_token.key?('user_id')
  end
end
