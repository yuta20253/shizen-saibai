class Api::V1::DiagnosesController < Api::V1::BaseController
  require "openai"
  def create
    base64_image = File.read(Rails.root.join("lib", "diagnosis_image1.txt")).strip
    image = "data:image/jpeg;base64,#{base64_image}"

    data_json = Diag::Json::JsonExportService.new.call
    weeds_json = data_json[:weeds_name_to_json]

    begin
      data = Diag::Ai::WeedIdentificationService.new(weeds_json: weeds_json, image: image).call
    rescue Diag::Errors::RateLimitExceeded
      render json: { error: "OpenAIの利用制限を超えました" }, status: :too_many_requests and return
    rescue Diag::Errors::InvalidResponseFormat => e
      render json: { error: "OpenAIの応答が不正です: #{e.message}" }, status: :bad_request and return
    rescue Diag::Errors::OpenAiCallFailed => e
      render json: { error: "OpenAI呼び出しエラー: #{e.message}" }, status: :internal_server_error and return
    rescue => e
      Rails.logger.error("想定外の例外: #{e.class} - #{e.message}")
      Rails.logger.error(e.backtrace.join("\n"))
      render json: { error: "予期せぬエラーが発生しました: #{e.class}" }, status: :internal_server_error and return
    end

    vegetable_name, weed_name, soil_data, reason = Diag::Json::SearchWeedService.new(data).call

    id = Diag::Db::SaveRecordService.new(vegetable_name: vegetable_name, weed_name: weed_name, soil_data: soil_data, reason: reason,
                                         current_user: current_user).call

    render json: id, status: :ok
  end
end
