class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user

  NotAuthorizedError = Class.new(StandardError)

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.authorize(request.headers)
    Rails.logger.warn @current_user.inspect
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
