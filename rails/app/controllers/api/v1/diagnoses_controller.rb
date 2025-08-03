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

    data_json = Diagnosis::Json::JsonExportService.new.call
    vegetables_json = data_json[:vegetables_to_json]
    weeds_json = data_json[:weeds_to_json]
    soils_json = data_json[:soils_to_json]

    data = begin
      Diagnosis::Ai::PromptResponderService.new(
        vegetables_json: vegetables_json,
        weeds_json: weeds_json,
        soils_json: soils_json,
        image: image,
      ).call
    rescue Diagnosis::Errors::RateLimitExceeded
      render json: { error: "OpenAIの利用制限を超えました" }, status: :too_many_requests and return
    rescue Diagnosis::Errors::InvalidResponseFormat => e
      render json: { error: "OpenAIの応答が不正です: #{e.message}" }, status: :bad_request and return
    rescue Diagnosis::Errors::OpenAiCallFailed => e
      render json: { error: "OpenAI呼び出しエラー: #{e.message}" }, status: :internal_server_error and return
    end

    parsed_data = parse_data_response(data)
    Diagnosis::Db::SaveRecordService.new(**parsed_data).call
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
