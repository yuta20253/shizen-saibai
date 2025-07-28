class Api::V1::BaseController < ApplicationController
  # include ApiV1UserHelpers
  before_action :authenticate_user!

  private

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last

    if token.blank?
      render json: { error: 'Unauthorized: token missing' }, status: :unauthorized and return
    end

    begin
      payload = JWT.decode(token, Rails.application.credentials.devise[:jwt_secret_key], true, { algorithm: 'HS256' }).first
      @current_user = User.find(payload['user_id'])
    rescue JWT::ExpiredSignature
      render json: { error: 'Unauthorized: token expired' }, status: :unauthorized and return
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: 'Unauthorized: invalid token' }, status: :unauthorized and return
    end
  end

  # current_userヘルパーを使いたい場合はここで定義
  def current_user
    @current_user
  end
end
