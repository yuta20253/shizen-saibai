class Diag::Ai::WeedIdentificationService
  def initialize(weeds_json:, image:)
    @weeds_json = weeds_json
    @image = image
  end

  def call
    weeds_text_for_prompt = format_weed_list(@weeds_json)
    weeds_enum = weed_names_array(@weeds_json)

    Rails.logger.debug weeds_text_for_prompt.to_s
    client = OpenAI::Client.new(
      access_token: ENV["CHATGPT_API_KEY"],
    )
    user_prompt = <<~TEXT
        受け取った画像に対して、
        その画像に写っている雑草の名前を教えてください。
        なお、雑草は「雑草一覧」から選択してください。

        ## 雑草一覧（以下から1つ選んでください）
        #{weeds_text_for_prompt}

      【重要】
        - 出力する雑草名は、必ず「雑草一覧」にある **1種類** のみ。
        - 一覧にない雑草名・学名・別名・形容詞などは **絶対に使用しないでください**。
        - 「雑草一覧」に含まれない名前を出力した場合はエラーとみなします。

        【禁止事項】
        - 上記一覧にない雑草名を出力すること
        - 複数の雑草名を出力すること
        - 別名・学名・英語名・画像の説明・その他のコメントを出力すること

        ## 出力JSONフォーマット(厳守)
        以下の形式でJSONのみ出力してください（前後に、```jsonなどの余計な説明は絶対に不要です）:

        {
          "weed_name": "ユウゲショウ"
        }

    TEXT

    begin
      response = client.chat(
        parameters: {
          model: "gpt-4o",
          messages: [
            { role: "system", content: "あなたはJSON生成AIです。必ず純粋なJSONデータのみを返してください。絶対に```jsonなどの説明文や補足、余計な文章は一切含めてはいけません。" },
            { role: "user", content: [
              { type: "text", text: user_prompt },
              { type: "image_url", image_url: { url: @image } },
            ] },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "weed_identification",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  weed_name: {
                    type: "string",
                    enum: weeds_enum,
                  },
                },
                required: ["weed_name"],
                additionalProperties: false,
              },
            },
          },
        },
      )
    rescue Faraday::TooManyRequestsError => e
      Rails.logger.warn("OpenAI APIのレート制限を超えました: #{e.message}")
      raise Diag::Errors::RateLimitExceeded, e.message
    rescue => e
      Rails.logger.error("OpenAI API呼び出しに失敗しました: #{e.class} - #{e.message}")
      raise Diag::Errors::OpenAiCallFailed, "#{e.class}: #{e.message}"
    end

    # Rails.logger.debug("OpenAIレスポンス全体: #{response.inspect}")

    data_str = response.dig("choices", 0, "message", "content")
    Rails.logger.debug("GPTの生データ: #{data_str}")
    raise StandardError, "OpenAIからのレスポンスが空です" unless data_str

    json_start_index = data_str.index("{")

    raise StandardError, "OpenAIの出力が不完全です（JSONの開始が見つかりません）" unless json_start_index

    json_string = data_str[json_start_index..]

    # OpenAIの出力が不完全/JSONの形式が不正
    begin
      data = JSON.parse(json_string)
      unless data["weed_name"].is_a?(String) && !data["weed_name"].empty?
        raise Diag::Errors::InvalidResponseFormat, "OpenAIの出力が不完全です"
      end
    rescue JSON::ParserError => e
      Rails.logger.error("[JSONパースエラー] #{e.class}: #{e.message}")
      raise Diag::Errors::InvalidResponseFormat, "OpenAIの出力が不正なJSON形式です: #{e.message}"
    end

    data
  end

  def format_weed_list(json)
    return "" if json.blank?

    JSON.parse(json).map {|w| w["name"] }.join("\n")
  end

  def weed_names_array(json)
    return [] if json.blank?

    JSON.parse(json).map {|w| w["name"] }.compact.uniq
  end
end
