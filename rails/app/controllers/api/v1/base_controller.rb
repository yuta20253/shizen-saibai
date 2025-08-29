class Api::V1::BaseController < ApplicationController
  before_action :authenticate_user!

  private

    def authenticate_user!
      token = request.headers["Authorization"]&.split(" ")&.last

      if token.blank?
        render json: { error: "Authorizationヘッダーがありません" }, status: :unauthorized and return
      end

      begin
        payload = JWT.decode(token, ENV["DEVISE_JWT_SECRET_KEY"], true, { algorithms: ["HS256"] }).first
        @current_user = User.find(payload["user_id"])
      rescue JWT::ExpiredSignature
        render json: { error: "トークンの有効期限が切れています" }, status: :unauthorized and return
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: "無効なトークンです" }, status: :unauthorized and return
      end
    end

    attr_reader :current_user
end
