class AuthenticateUser

  def self.authenticate(email, password)
    @email = email
    @password = password
    maybeUser = user(email, password)
    JsonWebToken.encode(user_id: maybeUser[:id]) if maybeUser
  end

  private

  def self.user(email, password)
    user = User.find_by_email(email)
    return user if user && user.authenticate(password)
    nil
  end
end