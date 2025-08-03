class User::SignUpService
  def initialize(params)
    @user = User.new(params)
  end

  def call
    return nil unless @user.save

    payload = {
      user_id: @user.id,
      exp: 24.hours.from_now.to_i,
      jti: SecureRandom.uuid,
    }
    token = JWT.encode(payload, Rails.application.credentials.devise[:jwt_secret_key], "HS256")
    { user: @user, token: token }
  end
end
