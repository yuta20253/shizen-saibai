class Api::V1::PasswordResetsController < ApplicationController
  before_action :find_user
  def create
    if @user
      token = @user.send(:set_reset_password_token)
      UserMailer.reset_password(@user, token).deliver_later
    end

    render json: { message: "ご入力のメールアドレス宛に、パスワード再設定用のリンクを送信しました。" }, status: :ok
  end

  def verify
    return render_user_not_found unless @user
    return render_invalid_token unless token_valid?
    return render_expired_token unless @user.reset_password_period_valid?

    render json: { message: "トークンは有効です。" }, status: :ok
  end

  def update
    return render_user_not_found unless @user
    return render_invalid_token unless token_valid?
    return render_expired_token unless @user.reset_password_period_valid?

    if params[:password].blank? || params[:password_confirmation].blank?
      return render json: { message: "パスワードと確認用パスワードを入力してください。" }, status: :unprocessable_entity
    end

    if params[:password] != params[:password_confirmation]
      return render json: { message: "パスワードが一致しません。" }, status: :unprocessable_entity
    end

    if @user.update(password: params[:password])
      @user.update(reset_password_token: nil, reset_password_sent_at: nil)

      render json: { message: "パスワードを更新しました。" }, status: :ok
    else
      render json: { message: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  private
    def find_user
      @user = User.find_by(email: params[:email])
    end

    def token_valid?
      token = params[:token]
      return false if token.blank?
      digest_token = Devise.token_generator.digest(User, :reset_password_token, token)
      @user.reset_password_token == digest_token
    end

    def render_user_not_found
      render json: { message: "ユーザーが見つかりません。" }, status: :not_found
    end

    def render_invalid_token
      render json: { message: "無効なトークンです" }, status: :unauthorized
    end

    def render_expired_token
      render json: { message: "トークンの有効期限が切れています。" }, status: :unauthorized
    end
end
