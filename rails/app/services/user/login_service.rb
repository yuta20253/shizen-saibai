class User::LoginService
  def initialize(params)
    @email = params.dig(:user, :email) || params[:email]
    @password = params.dig(:user, :password) || params[:password]
  end

  def call
    user = User.find_by(email: @email)
    if user&.valid_password?(@password)
      payload = {
        user_id: user.id,
        exp: 24.hours.from_now.to_i,
        jti: SecureRandom.uuid
      }
      token = JWT.encode(payload, Rails.application.credentials.devise[:jwt_secret_key], 'HS256')
      return { user: user, token: token }
    else
      return nil
    end
  end
end
