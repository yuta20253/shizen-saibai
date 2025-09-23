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
    return unless validate_update_request?

    if @user.update(password: params[:password])
      @user.update!(reset_password_token: nil, reset_password_sent_at: nil)

      render json: { message: "パスワードを更新しました。" }, status: :ok
    else
      render json: { message: @user.errors.full_messages.join(", ") }, status: :unprocessable_content
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

    def validate_update_request?
      return render_user_not_found && false unless @user
      return render_invalid_token && false unless token_valid?
      return render_expired_token && false unless @user.reset_password_period_valid?
      return render_password_or_password_confirmation_blank && false unless password_present?
      return render_mismatch_password && false unless passwords_match?

      true
    end

    def password_present?
      params[:password].present? && params[:password_confirmation]
    end

    def passwords_match?
      params[:password] == params[:password_confirmation]
    end

    def render_password_or_password_confirmation_blank
      render json: { message: "パスワードと確認用パスワードを入力してください。" }, status: :unprocessable_content
    end

    def render_mismatch_password
      render json: { message: "パスワードが一致しません。" }, status: :unprocessable_content
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
