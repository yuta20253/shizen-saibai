class Api::V1::PasswordResetsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user
      token = user.send(:set_reset_password_token)
      UserMailer.reset_password(user, token).deliver_later
    end

    render json: { message: "ご入力のメールアドレス宛に、パスワード再設定用のリンクを送信しました。" }, status: :ok
  end
end
