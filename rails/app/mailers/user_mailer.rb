class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.reset_password_email.subject
  #
  def reset_password(user, token)
    @user = user
    @token = token
    url = "#{ENV["FRONTEND_URL"]}/password/reset/#{@token}?email=#{@user.email}"

    mail(to: @user.email, subject: "パスワード再設定のご案内", body: "パスワード再設定はこちらのリンクからお願いします： #{url}")
  end
end
