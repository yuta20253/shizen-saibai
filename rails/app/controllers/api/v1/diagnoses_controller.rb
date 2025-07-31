class Api::V1::DiagnosesController < Api::V1::BaseController
  require 'openai'
  def create
    # Request:
    #   雑草の写真
    #   土壌データ(pH_level・drainage・fertility)※プロントで説明するのもあり
    #   プロンプト
    # Response:
    # 各モデルで使用する用（検索・保存）
    # vegetableモデル用
    #   おすすめの野菜(name)
    # weedモデル用
    #   雑草の名前(name)
    # soilモデル用
    #   pH分類(pH_level)
    #   水はけ(drainage)
    #   肥沃度(fertility)
    # diagnosisモデル用
    #   おすすめ理由(根拠込)(result)
    #   ※ weed_soil_relationモデル(notes)
    #   ※ soil_vegetable_relations(reason)でも使用
    # weed_soil_relationモデル
    #   対応度(confidence)
    # soil_vegetable_relationモデル
    #   適性度(suitability)

    image = params[:image]
    soils = Soil.all.map do |soil|
      {
        pH_level: soil.pH_level,
        drainage: soil.drainage,
        fertility: soil.fertility
      }
    end
    soils_json = soils.to_json

    client = OpenAI::Client.new(
      access_token: Rails.application.credentials.chatgpt_api_key
    )

    # user_prompt = <<~TEXT
    #   分析指示
    #   入力：画像の雑草
    #   出力（以下の8項目を含む分析結果）：

    #   1. おすすめの野菜名

    #   2. 雑草名

    #   3. 土壌のpH分類（0〜9段階）

    #   4. 土壌の水はけ（3段階：良好: 0, 普通: 1, 悪い: 2）

    #   5. 土壌の肥沃度（3段階：高: 0, 中: 1, 低: 2）

    #   6. おすすめ理由（根拠）

    #   7. 雑草と土壌の対応度（0.0〜1.0の間）

    #   8. 土壌と野菜の適性度（3段階：高: 0, 中: 1, 低: 2）

    #   以下は現在の土壌データ一覧（JSON）です：
    #   #{soils_json}
    # TEXT

    user_prompt = <<~TEXT
      分析指示
      入力：画像の雑草
      以下のJSON形式で出力してください。説明や補足は一切不要です。
      出力は以下をそのまま出力してください：（出力は { から始まる純粋なJSONのみ）
      {
        "vegetable": {
          "name": "ニンジン"
        },
        "weed": {
          "name": "スベリヒユ"
        },
        "soil": {
          "pH_level": 4,
          "drainage": 0,
          "fertility": 1
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


    response = client.chat(
      parameters: {
        model: "gpt-4",
        messages: [{ role: "user", content: user_prompt }]
      }
    )

    data_str = response.dig("choices", 0, "message", "content")
    json_start_index = data_str.index('{')
    json_string = data_str[json_start_index..]

    data = JSON.parse(json_string)
    vegetable_name = data["vegetable"]["name"]
    weed_name = data["weed"]["name"]
    soil_data = data["soil"]
    diagnosis_result = data["diagnosis"]["result"]
    weed_soil_relation = data["weed_soil_relation"]
    soil_vegetable_relation = data["soil_vegetable_relation"]
    # puts vegetable_name
    # puts weed_name
    # puts soil_data
    # puts diagnosis_result
    vegetable = Vegetable.find_by(name: vegetable_name)
    weed = Weed.find_by(name: weed_name)
    soil = Soil.where(pH_level: soil_data["pH_level"]).where(drainage: soil_data["drainage"]).where(fertility: soil_data["fertility"]).first

    # puts "id: #{vegetable.id}, name: #{vegetable.name}"
    # puts "id: #{weed.id}, name: #{weed.name}"
    # puts "id: #{soil.id}, pH_level: #{soil.pH_level}, drainage: #{soil.drainage}, fertility: #{soil.fertility} "
    SoilVegetableRelation.create!(
      soil_id: soil.id,
      vegetable_id: vegetable.id,
      suitability: soil_vegetable_relation["suitability"],
      reason: soil_vegetable_relation["reason"]
    )

    WeedSoilRelation.create!(
      weed_id: weed.id,
      soil_id: soil.id,
      confidence: weed_soil_relation["confidence"],
      notes: weed_soil_relation["notes"]
    )
    render json: { message: data }
  end
end
