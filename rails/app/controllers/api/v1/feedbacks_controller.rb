class Api::V1::FeedbacksController < Api::V1::BaseController
  def create
    diagnosis = current_user.diagnoses.find(feedback_params[:diagnosis_id])
    feedback = diagnosis.feedbacks.build(
      feedback_text: feedback_params[:feedback_text],
      rating: feedback_params[:rating],
    )
    feedback.save!
    render json: { ok: true }, status: :created
  rescue ActiveRecord::RecordNotFound
    render json: { error: "診断結果が見つかりません。" }, status: :not_found
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.record.errors.full_messages.join(", ") }, status: :unprocessable_content
  end

  private

    def feedback_params
      params.require(:feedback).permit(:diagnosis_id, :feedback_text, :rating)
    end
end
