class Api::V1::DiagnosesController < Api::V1::BaseController
  require 'openai'
  def create
    file_type = ['image/jpeg', 'image/png']
    # max_size = 5.megabytes
    base64_image = File.read(Rails.root.join('lib', 'diagnosis_image1.txt')).strip
    image = 'data:image/jpeg;base64,' + base64_image
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
    weeds_json = data_json[:weeds_to_json]

    begin
      data = Diag::Ai::WeedIdentificationService.new(weeds_json: weeds_json, image: image).call
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

    vegetable_name, weed_name, soil_data, reason = Diag::Json::SearchWeedService.new(data).call

    Diag::Db::SaveRecordService.new(vegetable_name: vegetable_name, weed_name: weed_name, soil_data: soil_data, reason: reason).call

    render json: { message: data }, status: :ok
  end
end
