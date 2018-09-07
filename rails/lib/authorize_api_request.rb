class AuthorizeApiRequest

  def self.authorize(headers = {})
    user(headers)
  end

  private

  def self.user(headers)
    @user ||= User.find(decoded_auth_token(headers)[:user_id]) if decoded_auth_token(headers)
  end

  def self.decoded_auth_token(headers)
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header(headers))
  end

  def self.http_auth_header(headers)
    return headers['Authorization'].split(' ').last if headers['Authorization'].present?
    nil
  end
end