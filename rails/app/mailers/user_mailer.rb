class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.reset_password_email.subject
  #
  def reset_password(user, token)
    @user = user
    @token = token

    front_url =
      if Rails.env.production?
        ENV["PRD_FRONTEND_URL"]
      else
        ENV["FRONTEND_URL"]
      end

    @url = "#{front_url}/passwordreset/#{@token}?email=#{@user.email}"

    mail(to: @user.email, subject: "パスワード再設定のご案内")
  end
end
