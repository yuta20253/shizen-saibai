# 未ログインのランディングページで「サンプル診断」を見せるための公開エンドポイント。
# 実データ（seed の雑草→土壌→野菜の関係 JSON）から代表例を組み立てて返す。
# 認証不要のため BaseController ではなく ApplicationController を継承する。
# DB への保存は行わず、未保存の Diagnosis を既存 Serializer で描画する（histories#show と同形）。
class Api::V1::DemoDiagnosesController < ApplicationController
  # 誰でも知っている代表例（タンポポ → 中性土壌 → にんじん）
  FEATURED_WEED = "タンポポ".freeze

  def show
    result = Diag::Json::SearchWeedService.new({ "weed_name" => FEATURED_WEED }).call
    return render_not_found if result.nil?

    vegetable_name, weed_name, soil_data, reason = result

    weed = Weed.find_by(name: weed_name)
    vegetable = Vegetable.find_by(name: vegetable_name)
    soil = Soil.where(pH_level: soil_data[:pH_level])
               .where(drainage: soil_data[:drainage])
               .where(fertility: soil_data[:fertility])
               .first
    return render_not_found if weed.nil? || vegetable.nil? || soil.nil?

    diagnosis = Diagnosis.new(
      weed: weed,
      soil: soil,
      vegetable: vegetable,
      image_url: weed.image_url.presence || "",
      result: reason,
    )

    expires_in 1.hour, public: true
    render json: diagnosis, serializer: DiagnosisSerializer
  end

  private

    def render_not_found
      render json: { error: "サンプルデータが見つかりません。" }, status: :not_found
    end
end
