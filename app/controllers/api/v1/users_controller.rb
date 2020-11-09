# frozen_string_literal: true

module API
  module V1
    class UsersController < APIController
      def index
        users = User.all

        render json: { data: [users] }
      end
    end
  end
end
