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

    mail(to: @user.email, subject: "パスワードリセットのご案内", body: "パスワードリセットはこちらのリンクからお願いします： #{url}")
  end
end
