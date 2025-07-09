class API::V1::Users::RegistrationsController < Devise::RegistrationsController
  include ApiV1UserHelpers
  respond_to :json

  def destroy
    resource = current_user
    resource.soft_delete! # 論理削除＋メールマスキング処理
    sign_out(resource) # JWTなどのサインアウト処理
    render json: { message: '退会が完了しました。' }, status: :ok
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: resource.slice(:id, :email, :name)
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "User couldn't be created successfully.", errors: resource.errors.full_messages }
      }, status: :unprocessable_entity
    end
  end
end
