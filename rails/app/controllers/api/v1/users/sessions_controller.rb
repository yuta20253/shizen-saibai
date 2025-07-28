class Api::V1::Users::SessionsController < ActionController::API
  def create
    email = params.dig(:user, :email) || params[:email]
    password = params.dig(:user, :password) || params[:password]

    user = User.find_by(email: email)

    if user&.valid_password?(password)
      payload = {
        user_id: user.id,
        exp: 24.hours.from_now.to_i,
        jti: SecureRandom.uuid
      }
      token = JWT.encode(payload, Rails.application.credentials.devise[:jwt_secret_key], 'HS256')
      response.set_header('Authorization', "Bearer #{token}")
      render json: {
        status: 200,
        message: 'ログインに成功しました',
        token: token,
        user: user.as_json(only: [:id, :email, :name, :role])
      }
    else
      render json: { status: 401, message: 'メールアドレスか、パスワードが不正です' }, status: :unauthorized
    end
  end

  def destroy
    token = request.headers['Authorization']&.split(' ')&.last

    if token.blank?
      render json: { status: 401, message: 'Authorizationヘッダーがありません' }, status: :unauthorized and return
    end

    begin
      jwt_payload = JWT.decode(token, Rails.application.credentials.devise[:jwt_secret_key], true, algorithm: 'HS256').first

      render json: { status: 200, message: 'ログアウトに成功しました' }, status: :ok
    rescue JWT::ExpiredSignature
      render json: { status: 401, message: 'トークンの有効期限が切れています' }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { status: 401, message: '無効なトークンです' }, status: :unauthorized
    end
  end
end
