class Api::V1::UsersController < Api::V1::BaseController
  def update
    if current_user.update(user_params)
      render json: {
        message: "個人情報を更新しました！",
        user: current_user.slice(:id, :email, :name, :role)
      }, status: :ok
    else
      render json: {
        errors: current_user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
  end
end
