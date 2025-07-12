class HealthCheckController < ApplicationController
  def index
    render json: { message: "RailsとNext.jsの連携!!!!!" }, status: :ok
  end
end
