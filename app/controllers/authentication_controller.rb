class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def authenticate
    maybeToken = AuthenticateUser.authenticate(params[:email], params[:password])

    if maybeToken
      render json: {auth_token: maybeToken}
    else
      render json: {error: 'Invalid credentials'}, status: :unauthorized
    end
  end
end
