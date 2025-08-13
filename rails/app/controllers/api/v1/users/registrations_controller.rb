class Api::V1::Users::RegistrationsController < ActionController::API
  def create
    result = User::SignUpService.new(sign_up_params).call
    if result
      response.set_header("Authorization", "Bearer #{result[:token]}")
      render json: {
        status: 200,
        message: "サインアップに成功しました",
        token: result[:token],
        user: result[:user].as_json(only: [:id, :email, :name]),
      }
    else
      user = User.new(sign_up_params)
      user.valid? # バリデーション実行してエラー情報をセット
      render json: {
        status: 422,
        message: "サインアップに失敗しました",
        errors: user.errors.full_messages,
      }, status: :unprocessable_entity
    end
  end

  def destroy
    token = request.headers["Authorization"]&.split(" ")&.last

    if token.blank?
      render json: { status: 401, message: "Authorizationヘッダーがありません" }, status: :unauthorized and return
    end

    begin
      payload = JWT.decode(token, Rails.application.credentials.devise[:jwt_secret_key], true, algorithm: "HS256").first
      user = User.find_by(id: payload["user_id"])

      if user.nil?
        render json: { status: 401, message: "ユーザーが見つかりません" }, status: :unauthorized and return
      end

      # 論理削除＆メールマスキング処理（soft_delete! はUserモデルに実装済み前提）
      user.soft_delete!

      render json: { status: 200, message: "退会処理が完了しました" }, status: :ok
    rescue JWT::ExpiredSignature
      render json: { status: 401, message: "トークンの有効期限が切れています" }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { status: 401, message: "無効なトークンです" }, status: :unauthorized
    end
  end

  private

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation, :name)
    end
end
