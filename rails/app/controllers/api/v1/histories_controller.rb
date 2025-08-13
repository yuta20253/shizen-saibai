class Api::V1::HistoriesController < Api::V1::BaseController
  def index
    diagnoses = current_user.diagnoses.includes(:weed, :soil, :vegetable)
    if diagnoses.exists?
      render json: diagnoses, each_serializer: ::DiagnosisSerializer
    else
      render json: []
    end
  end

  def show
  end
end
