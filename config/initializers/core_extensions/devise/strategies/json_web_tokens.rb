# frozen_string_literal: true

# https://github.com/wardencommunity/warden/wiki/Strategies
module Devise
  module Strategies
    class JsonWebToken < Base
      def valid?
        p 'Devise#valid?'

        cookies.signed[:jwt].present?
      end

      def authenticate!
        p 'Devise#authenticate!'
        fail! unless valid_token?

        success! User.find(decoded_jwt_token['user_id'])
      end

      protected

      def valid_token?
        !decoded_jwt_token || !user_id?
      end

      def user_id?
        decoded_jwt_token.key?('user_id')
      end

      private

      def decoded_jwt_token
        JwtConcern&.decode(cookies.signed[:jwt])
      end
    end
  end
end
