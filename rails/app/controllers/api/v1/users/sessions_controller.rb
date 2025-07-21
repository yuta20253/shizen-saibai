class Api::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      # JWTはWarden::JWTAuthが自動的にヘッダーに入れてくれる場合が多い
      token = JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, Rails.application.secrets.secret_key_base)

      response.set_header('Authorization', "Bearer #{token}")
      render json: {
        status: 200,
        message: "ログインに成功しました",
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    else
      render json: { status: 401, message: "メールアドレスか、パスワードが不正です" }, status: :unauthorized
    end
  end

  private

  # ログアウト時のレスポンス
  def respond_to_on_destroy
    token = request.headers['Authorization']&.split(' ')&.last
    jwt_payload = token && JWT.decode(
      token,
      Rails.application.credentials.devise[:jwt_secret_key]
    ).first rescue nil

    current_user = jwt_payload && User.find_by(id: jwt_payload['sub'])

    if current_user
      render json: { status: 200, message: 'ログアウトに成功しました' }, status: :ok
    else
      render json: { status: 401, message: "アクティブなセッションが見つかりませんでした" }, status: :unauthorized
    end
  end
end
