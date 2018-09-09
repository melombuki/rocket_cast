class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user

  NotAuthorizedError = Class.new(StandardError)

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.authorize(request.headers)
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
