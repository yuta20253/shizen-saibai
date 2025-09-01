class Diag::Ai::WeedIdentificationService
  def initialize(weeds_json:, image:)
    @weeds_json = weeds_json
    @image = image
  end

  def call
    prompt = Diag::Ai::WeedPrompt.build_prompt(weed_list_text)
    weeds_enum = weed_names_array(@weeds_json)
    content = request_openai(prompt, weeds_enum)
    parse_content!(content)
  end

  private

    def request_openai(prompt, weeds_enum)
      Rails.logger.debug(prompt.to_s)
      response = openai_client.chat(parameters: build_params(prompt, weeds_enum))
      content  = response.dig("choices", 0, "message", "content")

      Rails.logger.debug("GPTの生データ: #{content}")
      raise StandardError, "OpenAIからのレスポンスが空です" if content.blank?

      content
    rescue Faraday::TooManyRequestsError => e
      Rails.logger.warn("OpenAI APIのレート制限を超えました: #{e.message}")
      raise Diag::Errors::RateLimitExceeded, e.message
    rescue => e
      Rails.logger.error("OpenAI API呼び出しに失敗しました: #{e.class} - #{e.message}")
      raise Diag::Errors::OpenAiCallFailed, "#{e.class}: #{e.message}"
    end

    def openai_client
      @openai_client ||= OpenAI::Client.new(
        access_token: ENV["CHATGPT_API_KEY"],
      )
    end

    def build_params(prompt, weeds_enum)
      {
        model: "gpt-4o",
        messages: build_messages(prompt),
        response_format: Diag::Ai::WeedPrompt.response_schema(weeds_enum),
      }
    end

    def build_messages(prompt)
      [
        {
          role: "system",
          content: "あなたはJSON生成AIです。必ず純粋なJSONデータのみを返してください。余計な文章は一切含めないでください。",
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: @image } },
          ],
        },
      ]
    end

    def parse_content!(content)
      data = JSON.parse(content)
      name = data["weed_name"]

      unless name.is_a?(String) && name.present?
        raise Diag::Errors::InvalidResponseFormat, "weed_name が不正です"
      end

      data
    rescue JSON::ParserError => e
      Rails.logger.error("[JSONパースエラー] #{e.class}: #{e.message}")
      raise Diag::Errors::InvalidResponseFormat, "OpenAIの出力が不正なJSON形式です: #-{e.message}"
    end

    def weed_list_text
      return "" if @weeds_json.blank?

      JSON.parse(@weeds_json).map {|w| w["name"] }.join("\n")
    end

    def weed_names_array(json)
      return [] if json.blank?

      JSON.parse(json).map {|w| w["name"] }.compact.uniq
    end
end
