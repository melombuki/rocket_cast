class ApiController < ApplicationController
  before_action :authenticate_request
  include JSONAPI::ActsAsResourceController

  def context
    {current_user: current_user}
  end
  
  def reject_forbidden_request
    render json: {error: 'Forbidden'}, :status => 403
  end
  
  rescue_from ApplicationController::NotAuthorizedError, with: :reject_forbidden_request
end