class Api::V1::DiagnosesController < Api::V1::BaseController
  require "openai"
  require 'aws-sdk-s3'
  def create
    Rails.logger.info("受け取った params[:image]: #{params[:image].class}")

    begin
      image_data_url = Diag::File::FileUploadService.new(params[:image]).call
    rescue Diag::Errors::ImageMissing => e
      Rails.logger.warn("パラメータ不足: #{e.message}")
      render json: { error: "画像が選択されていません" }, status: :bad_request and return
    rescue Diag::Errors::InvalidFileType => e
      Rails.logger.warn("ファイル形式エラー: #{e.message}")
      render json: { error: "ファイル形式が不正です" }, status: :bad_request and return
    rescue Diag::Errors::FileSizeExceeded => e
      Rails.logger.warn("ファイルサイズが大きすぎます: #{e.message}")
      render json: { error: "ファイルサイズが大きすぎます" }, status: :bad_request and return
    end

    data_json = Diag::Json::JsonExportService.new.call
    weeds_json = data_json[:weeds_name_to_json]

    begin
      data = Diag::Ai::WeedIdentificationService.new(weeds_json: weeds_json, image: image_data_url).call
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
                                         current_user: current_user, image_file: params[:image]).call

    render json: id, status: :ok
  end
end
