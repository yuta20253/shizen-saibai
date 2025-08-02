class Api::V1::DiagnosesController < Api::V1::BaseController
  require 'openai'
  def create
    file_type = ['image/jpeg', 'image/png']
    # max_size = 5.megabytes

    image = params[:image]

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
    # Rails.logger.debug("JsonExportServiceの出力: #{data_json.inspect}")
    vegetables_json = data_json[:vegetables_to_json]
    weeds_json = data_json[:weeds_to_json]
    soils_json = data_json[:soils_to_json]

    begin
      data = Diagnosis::Ai::PromptResponderService.new(vegetables_json: vegetables_json, weeds_json: weeds_json, soils_json: soils_json).call
    rescue => e
      Rails.logger.error("OpenAI呼び出しエラー: #{e.class} - #{e.message}")
      Rails.logger.error(e.backtrace.join("\n"))
      render json: { error: e.message }, status: 500 and return
    end

    vegetable_name = data["vegetable"]["name"]
    weed_name = data["weed"]["name"]
    soil_data = data["soil"]
    diagnosis_result = data["diagnosis"]["result"]
    weed_soil_relation = data["weed_soil_relation"]
    soil_vegetable_relation = data["soil_vegetable_relation"]

    Diagnosis::Db::SaveRecordService.new(vegetable_name: vegetable_name, weed_name: weed_name, soil_data: soil_data, weed_soil_relation: weed_soil_relation, soil_vegetable_relation: soil_vegetable_relation).call

    render json: { message: data }, status: :ok
  end
end
