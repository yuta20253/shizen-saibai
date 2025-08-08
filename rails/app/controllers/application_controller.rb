class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  include ActionController::MimeResponds
  include ActionController::Helpers
  include Devise::Controllers::Helpers

  rescue_from StandardError, with: :handle_internal_server_error
  rescue_from ActionController::ParameterMissing, with: :handle_param_missing
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
  rescue_from Faraday::TimeoutError, with: :handle_timeout
  rescue_from Faraday::ConnectionFailed, with: :handle_connection_failed
  rescue_from JSON::ParserError, with: :handle_json_parse_error

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password, :name])
  end

  def handle_internal_server_error(error)
    render json: {
      status: "error",
      code: :internal_server_error,
      message: "サーバー内部でエラーが発生しました",
    }, status: 500
  end

  def handle_param_missing(error)
    render json: {
      status: "error",
      code: :bad_request,
      message: "リクエストに必要なパラメータが不足しています。",
    }, status: 400
  end

  def handle_not_found(error)
    render json: {
      status: "error",
      code: :not_found,
      message: "対象のデータが見つかりません",
    }, status: 404
  end

  def handle_validation_error(error)
    render json: {
      status: "error",
      code: :validation_error,
      message: error.record.errors.full_messages.join(', ')
    }, status: 422
  end

  def handle_timeout(error)
    render json: {
      status: "error",
      code: :timeout,
      message: "OpenAIとの通信がタイムアウトしました。",
    }, status: 504
  end

  def handle_connection_failed(error)
    render json: {
      status: "error",
      code: :connection_failed,
      message: "OpenAIへの接続に失敗しました。",
    }, status: 502
  end

  def handle_json_parse_error
    render json: {
      status: "error",
      code: :invalid_json_response,
      message: "JSON形式に誤りがあります。",
    }, status: 400
  end
end
