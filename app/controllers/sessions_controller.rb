# frozen_string_literal: true

class SessionsController < APIController
  skip_before_action :authenticate_user, only: [:create, :destroy]
  before_action :find_user, only: [:create]

  def create
    if @user&.valid_password?(login_params[:password])
      create_jwt_with({ user_id: @user.id })
      render json: { user: { username: 'jack' } }, status: :created
    else
      head :unauthorized
    end
  end

  def destroy
    cookies.delete :jwt
    head :ok
  end

  private

  def find_user
    @user = User.find_by(email: login_params[:email])
  end

  def login_params
    params.require(:data).permit(:email, :password, :remember_me)
  end
end
