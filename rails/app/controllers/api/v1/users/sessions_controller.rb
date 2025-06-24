# app/controllers/api/v1/users/sessions_controller.rb
class API::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  # ログイン成功時のレスポンス
  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      data:   resource
    }, status: :ok
  end

  # ログアウト時のレスポンス
  def respond_to_on_destroy
    token = request.headers['Authorization']&.split(' ')&.last
    jwt_payload = token && JWT.decode(
      token,
      Rails.application.credentials.devise[:jwt_secret_key]
    ).first rescue nil

    current_user = jwt_payload && User.find_by(id: jwt_payload['sub'])

    if current_user
      render json: { status: 200, message: 'Logged out successfully' }, status: :ok
    else
      render json: { status: 401, message: "Couldn't find an active session" }, status: :unauthorized
    end
  end
end
