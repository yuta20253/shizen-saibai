class Diagnosis::Ai::PromptResponderService
  def initialize(vegetables_json:, weeds_json:, soils_json:)
    @vegetables_json = vegetables_json
    @weeds_json = weeds_json
    @soils_json = soils_json
  end

  def call
    vegetable = @vegetables_json
    weed = @weeds_json
    soil = @soils_json

    client = OpenAI::Client.new(
      access_token: Rails.application.credentials.chatgpt_api_key
    )

    # user_prompt = <<~TEXT
    #   分析指示
    #   入力：画像の雑草
    #   出力（以下の8項目を含む分析結果）：

    #   1. おすすめの野菜名(日本名)

    #   2. 雑草名(日本名)

    #   3. 土壌のpH分類(pH_level)（0〜9段階）

    #   4. 土壌の水はけ(drainage)（3段階：良好: 0, 普通: 1, 悪い: 2）

    #   5. 土壌の肥沃度(fertility)（3段階：高: 0, 中: 1, 低: 2）

    #   6. おすすめ理由(result・notes・reason)（根拠）

    #   7. 雑草と土壌の対応度（0.0〜1.0の間）

    #   8. 土壌と野菜の適性度(suitability)（3段階：高: 0, 中: 1, 低: 2）

    # Rails.logger.debug("#{format_weed_list(weed)}")
    # Rails.logger.debug("#{format_soil_list(soil)}")
    # Rails.logger.debug("#{format_vegetable_list(vegetable)}")
    user_prompt = <<~TEXT
      受け取った画像に対して、
      その画像に写っている雑草の種類、その雑草が生えている土壌環境、その土壌環境で栽培するのに適している野菜を出力してください。
      なお、雑草は「雑草一覧」から、土壌環境は「土壌環境一覧」から、野菜は「野菜一覧」から選択してください。
      雑草は1種類、土壌環境も1種類、野菜も１種類。
      雑草、土壌、野菜はJSONフォーマットで出力してください。

      ## 雑草一覧
      #{format_weed_list(weed)}

      ## 土壌環境一覧
      #{format_soil_list(soil)}

      ## 野菜一覧
      #{format_vegetable_list(vegetable)}

      【重要】雑草は上記の雑草一覧から1種類のみ、土壌も1種類のみ、野菜も1種類のみ選択してください。
      それ以外のデータは絶対に使わないでください。
      【禁止事項】
      上記一覧にないデータを一切生成してはいけません。必ず一覧内の項目をそのまま使ってください。

      【補足】以下の数値はそれぞれ、モデルのenum定義に従ってください。

      - pH_level（0〜9）: 0=極端に酸性, 5=中性, 9=非常にアルカリ性
      - drainage（排水性）: 0=良好, 1=普通, 2=悪い
      - fertility（肥沃度）: 0=高, 1=中, 2=低
      - suitability（野菜適性）: 0=高, 1=中, 2=低

      ## 出力JSONフォーマット(厳守)
      以下の形式でJSONのみ出力してください（前後に余計な説明は不要です）:
      なお、下記は出力フォーマットの例であり、値は例示です。必ず入力の雑草・土壌・野菜情報に基づいて適切な値を返してください。
      {
        "weed": {
          "name": "スベリヒユ"
        },
        "soil": {
          "pH_level": 4,
          "drainage": 0,
          "fertility": 1
        },
        "vegetable": {
          "name": "ニンジン"
        },
        "diagnosis": {
          "result": "スベリヒユは酸性寄りの土壌かつ水はけが良好で、そこそこの肥沃度の環境を好んで生育します。これはニンジンの生育に適した条件とよく一致します。"
        },
        "weed_soil_relation": {
          "notes": "スベリヒユは酸性寄りの土壌かつ水はけが良好で、そこそこの肥沃度の環境を好んで生育します。",
          "confidence": 0.82
        },
        "soil_vegetable_relation": {
          "reason": "これはニンジンの生育に適した条件とよく一致します。",
          "suitability": 0
        }
      }
    TEXT

    # Rails.logger.debug("Prompt内容:\n#{user_prompt}")

    response = client.chat(
      parameters: {
        model: "gpt-4",
        messages: [
          { role: "system", content: "あなたはJSON生成AIです。必ず純粋なJSONデータのみを返してください。説明文や補足、余計な文章は一切含めてはいけません。" },
          { role: "user", content: [
              { type: "text", text: user_prompt }
              # { type: "image_url", image_url: { url: image_url } }
            ]
          }
        ]
      }
    )
    # Rails.logger.debug("OpenAIレスポンス全体: #{response.inspect}")

    data_str = response.dig("choices", 0, "message", "content")
    Rails.logger.debug("GPTの生データ: #{data_str}")
    raise StandardError, "OpenAIからのレスポンスが空です" unless data_str

    json_start_index = data_str.index('{')

    raise StandardError, "OpenAIの出力が不完全です（JSONの開始が見つかりません）" unless json_start_index
    json_string = data_str[json_start_index..]

    # OpenAIの出力が不完全/JSONの形式が不正
    begin
      data = JSON.parse(json_string)
      %w[vegetable weed soil diagnosis weed_soil_relation soil_vegetable_relation].each do |key|
        # render json: { message: "OpenAIの出力が不完全です（#{key} がありません）", code: :invalid_json_response, status: "error" }, status: 400
        raise StandardError, "OpenAIの出力が不完全です" unless data[key]
      end
    rescue JSON::ParserError => e
      Rails.logger.error("[JSONパースエラー] #{e.class}: #{e.message}")
      raise StandardError, "OpenAIの出力が不正なJSON形式です: #{e.message}"
    end

    return data
  end

  def format_weed_list(json)
    return "" if json.nil? || json.empty?
    JSON.parse(json).map { |w| "・#{w['name']}" }.join("\n")
  end

  def format_vegetable_list(json)
    return "" if json.nil? || json.empty?
    JSON.parse(json).map { |v| "・#{v['name']}" }.join("\n")
  end

  def format_soil_list(json)
    return "" if json.nil? || json.empty?
    soils = JSON.parse(json)
    soils.map.with_index do |s, i|
      "・pH: #{s['pH_level']}, 水はけ: #{s['drainage']}, 肥沃度: #{s['fertility']}"
    end.join("\n")
  end
end
