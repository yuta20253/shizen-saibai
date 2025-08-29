class User::LoginService
  def initialize(params)
    @email = params.dig(:user, :email) || params[:email]
    @password = params.dig(:user, :password) || params[:password]
  end

  def call
    user = User.find_by(email: @email)
    return nil unless user&.valid_password?(@password)

    payload = {
      user_id: user.id,
      exp: 24.hours.from_now.to_i,
      jti: SecureRandom.uuid,
    }
    token = JWT.encode(payload, ENV["DEVISE_JWT_SECRET_KEY"], "HS256")
    { user: user, token: token }
  end
end
