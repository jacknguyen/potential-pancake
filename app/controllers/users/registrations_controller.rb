# frozen_string_literal: true

class Users::RegistrationsController < APIController
  skip_before_action :authenticate_user, only: [:create]
  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    p 'hello world'
    @user = User.create(sign_up_params)
    if @user
      create_jwt_with({ user_id: @user.id })
      render json: { user: { username: @user.email } }, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  private

  def sign_up_params
    params.require(:sign_up).permit(:email, :password, :password_confirmation)
  end
end
