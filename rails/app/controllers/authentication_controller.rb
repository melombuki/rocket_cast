class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def authenticate
    maybeToken = AuthenticateUser.authenticate(auth_params[:email], auth_params[:password])

    if maybeToken
      render json: {auth_token: maybeToken}
    else
      render json: {error: 'Invalid credentials'}, status: :unauthorized
    end
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end
