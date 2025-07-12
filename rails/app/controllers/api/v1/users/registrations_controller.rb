class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  include ApiV1UserHelpers
  respond_to :json
  skip_before_action :verify_authenticity_token, raise: false
  skip_before_action :require_no_authentication, only: [:create]
  skip_before_action :authenticate_user!, only: [:create], raise: false

  def create
    user = User.new(sign_up_params)

    if user.save
      render json: {
        status: { code: 200, message: 'サインアップできました' },
        user: user.slice(:id, :email, :name)
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "サインアップできませんでした。", errors: user.errors.full_messages }
      }, status: :unprocessable_entity
    end
  end

  def destroy
    resource = current_user
    resource.soft_delete! # 論理削除＋メールマスキング処理
    sign_out(resource) # JWTなどのサインアウト処理
    render json: { message: '退会しました。' }, status: :ok
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end

  def after_sign_out_path_for(resource_or_scope)
    nil # リダイレクトを無効化
  end
end
