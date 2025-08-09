class Api::V1::HistoriesController < Api::V1::BaseController
  def index
    diagnoses = current_user.diagnoses.includes(:weed, :soil, :vegetable)
    if diagnoses.exists?
      render json: diagnoses, each_serializer: ::DiagnosisSerializer
    else
      render json: { message: "診断履歴がありません。" }
    end
  end

  def show
    diagnosis = Diagnosis.find(params[:id])
    render json: diagnosis, serializer: DiagnosisSerializer
  rescue ActiveRecord::RecordNotFound
    render json: { error: "診断結果が見つかりません。" }, status: :not_found
  end

  private

    def diagnosis_params
      params.require(:diagnosis).permit(:id)
    end
end
