class Api::V1::Users::SessionsController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:create]
  def create
    result = User::LoginService.new(login_params).call
    if result
      response.set_header('Authorization', "Bearer #{result[:token]}")
      render json: {
        status: 200,
        message: 'ログインに成功しました',
        token: result[:token],
        user: result[:user].as_json(only: [:id, :email, :name, :role])
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
      JWT.decode(token, Rails.application.credentials.devise[:jwt_secret_key], true, algorithm: 'HS256').first

      render json: { status: 200, message: 'ログアウトに成功しました' }, status: :ok
    rescue JWT::ExpiredSignature
      render json: { status: 401, message: 'トークンの有効期限が切れています' }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { status: 401, message: '無効なトークンです' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end
end
