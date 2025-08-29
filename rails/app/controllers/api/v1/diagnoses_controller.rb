class Api::V1::DiagnosesController < Api::V1::BaseController
  require "openai"

  def create
    image_data_url = upload_image_or_halt
    return unless image_data_url

    weeds_json = export_weeds_json

    data = identify_or_halt(weeds_json, image_data_url)
    return unless data

    id = persist_diagnosis(data)

    render json: id, status: :ok
  end

  private

    # 画像アップロード (例外: レンダーに集約)
    def upload_image_or_halt
      Diag::File::FileUploadService.new(params[:image]).call
    rescue Diag::Errors::ImageMissing => e
      log_warn("パラメータ不足: #{e.message}")
      render_error("画像が選択されていません", :bad_request)
    rescue Diag::Errors::InvalidFileType => e
      log_warn("ファイル形式エラー: #{e.message}")
      render_error("ファイル形式が不正です", :bad_request)
    rescue Diag::Errors::FileSizeExceeded => e
      log_warn("ファイルサイズが大きすぎます: #{e.message}")
      render_error("ファイルサイズが大きすぎます", :bad_request)
    end

    # マスタJSONの取得
    def export_weeds_json
      data_json = Diag::Json::JsonExportService.new.call
      data_json[:weeds_name_to_json]
    end

    # AI による雑草判定（例外→レンダーに集約）
    def identify_or_halt(weeds_json, image_data_url)
      Diag::Ai::WeedIdentificationService.new(
        weeds_json: weeds_json,
        image: image_data_url,
      ).call
    rescue Diag::Errors::RateLimitExceeded
      render_error("OpenAIの利用制限を超えました", :too_many_requests)
    rescue Diag::Errors::InvalidResponseFormat => e
      render_error("OpenAIの応答が不正です: #{e.message}", :bad_request)
    rescue Diag::Errors::OpenAiCallFailed => e
      render_error("OpenAI呼び出しエラー: #{e.message}", :internal_server_error)
    rescue => e
      log_error("想定外の例外: #{e.class} - #{e.message}", e)
      render_error("予期せぬエラーが発生しました: #{e.class}", :internal_server_error)
    end

    # 判定結果の保存
    def persist_diagnosis(data)
      vegetable_name, weed_name, soil_data, reason =
        Diag::Json::SearchWeedService.new(data).call

      Diag::Db::SaveRecordService.new(
        vegetable_name: vegetable_name,
        weed_name: weed_name,
        soil_data: soil_data,
        reason: reason,
        current_user: current_user,
      ).call
    end

    def render_error(message, status)
      render json: { error: message }, status: status
      nil
    end

    def log_warn(message)
      Rails.logger.warn(message)
    end

    def log_error(message, exception)
      Rails.logger.error(message)
      Rails.logger.error(exception.backtrace.join("\n"))
    end
end
