class Api::V1::DiagnosesController < Api::V1::BaseController
  require "openai"
  def create
    # max_size = 5.megabytes
    image = read_image
    # ファイル形式が不正
    # raise ActionController::ParameterMissing, :image if params[:image].blank?
    # unless file_type.include?(image.content_type)
    #   render json: {message: "ファイル形式が不正です", code: :invalid_file_type, status: "error"}
    #   return
    # end

    # ファイルサイズ超過
    # if image.size > max_size
    #   render json: { status: 'error', code: :file_size_exceeded, message: 'ファイルサイズが大きすぎます' }, status: :bad_request
    #   return
    # end

    data_json = Diag::Json::JsonExportService.new.call
    vegetables_json = data_json[:vegetables_to_json]
    weeds_json = data_json[:weeds_to_json]
    soils_json = data_json[:soils_to_json]

    begin
      data = Diag::Ai::PromptResponderService.new(vegetables_json: vegetables_json, weeds_json: weeds_json, soils_json: soils_json, image: image).call
    rescue Diag::Errors::RateLimitExceeded => e
      render json: { error: "OpenAIの利用制限を超えました" }, status: 429 and return
    rescue Diag::Errors::InvalidResponseFormat => e
      render json: { error: "OpenAIの応答が不正です: #{e.message}" }, status: 400 and return
    rescue Diag::Errors::OpenAiCallFailed => e
      render json: { error: "OpenAI呼び出しエラー: #{e.message}" }, status: 500 and return
    rescue => e
      Rails.logger.error("想定外の例外: #{e.class} - #{e.message}")
      Rails.logger.error(e.backtrace.join("\n"))
      render json: { error: "予期せぬエラーが発生しました: #{e.class}" }, status: 500 and return
    end

    vegetable_name = data["vegetable"]["name"]
    weed_name = data["weed"]["name"]
    soil_data = data["soil"]
    diagnosis_result = data["diagnosis"]["result"]
    weed_soil_relation = data["weed_soil_relation"]
    soil_vegetable_relation = data["soil_vegetable_relation"]

    Diag::Db::SaveRecordService.new(vegetable_name: vegetable_name, weed_name: weed_name, soil_data: soil_data, weed_soil_relation: weed_soil_relation, soil_vegetable_relation: soil_vegetable_relation).call

    render json: { message: data }, status: :ok
  end

  private

    def read_image
      base64_image = File.read(Rails.root.join("lib", "diagnosis_image.txt")).strip
      "data:image/jpeg;base64,#{base64_image}"
    end

    def parse_data_response(data)
      {
        vegetable_name: data["vegetable"]["name"],
        weed_name: data["weed"]["name"],
        soil_data: data["soil"],
        diagnosis_result: data["diagnosis"]["result"],
        weed_soil_relation: data["weed_soil_relation"],
        soil_vegetable_relation: data["soil_vegetable_relation"],
      }
    end
end
