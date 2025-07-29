class Api::V1::ChatsController < Api::V1::BaseController
  require 'openai'
  before_action :log_auth_headers
  def create
    Rails.logger.debug "🟡 Authorizationヘッダー: #{request.headers['Authorization']}"
    Rails.logger.debug "🟢 current_user: #{current_user&.email || '認証されていない'}"
    Rails.logger.debug "🔑 APIキー: #{Rails.application.credentials.chatgpt_api_key.inspect}"
    client = OpenAI::Client.new(
      access_token: Rails.application.credentials.chatgpt_api_key
    )

    user_prompt = params[:prompt] || "こんにちは、調子はどう？"
    response = client.chat(
      parameters: {
        model: "gpt-4",
        messages: [{ role: "user", content: user_prompt }]
      }
    )
    puts "current_user: #{current_user}"
    puts response.dig("choices", 0, "message", "content")
    message = response.dig("choices", 0, "message", "content")

    if message.present?
      render json: { message: message }
    else
      render json: { error: "ChatGPTからの応答が得られませんでした" }, status: :bad_gateway
    end
  end

  private

  def log_auth_headers
    Rails.logger.debug "Authorization header: #{request.headers['Authorization']}"
    Rails.logger.debug "Warden user: #{warden.user.inspect}"
  end
end
