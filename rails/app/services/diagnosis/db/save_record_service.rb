class Diagnosis::Db::SaveRecordService
  def initialize(vegetable_name:, weed_name:, soil_data:, weed_soil_relation:, soil_vegetable_relation:)
    # 該当する野菜データが存在しない
    @vegetable = Vegetable.find_by(name: vegetable_name)
    raise ActiveRecord::RecordNotFound, "野菜データ、#{vegetable_name}が見つかりません。" unless @vegetable

    # 該当する雑草データが存在しない
    @weed = Weed.find_by(name: weed_name)
    raise ActiveRecord::RecordNotFound, "雑草データ、#{weed_name}が見つかりません。" unless @weed

    # 該当する土壌データが存在しない
    @soil = Soil.where(pH_level: soil_data["pH_level"]).where(drainage: soil_data["drainage"]).where(fertility: soil_data["fertility"]).first
    raise ActiveRecord::RecordNotFound, "土壌データが見つかりません。" unless @soil

    @weed_soil_relation = weed_soil_relation
    @soil_vegetable_relation = soil_vegetable_relation
  end

  def call
    ActiveRecord::Base.transaction do
      SoilVegetableRelation.create!(
        soil_id: @soil.id,
        vegetable_id: @vegetable.id,
        suitability: @soil_vegetable_relation["suitability"].to_i,
        reason: @soil_vegetable_relation["reason"]
      )
      WeedSoilRelation.create!(
        weed_id: @weed.id,
        soil_id: @soil.id,
        confidence: @weed_soil_relation["confidence"],
        notes: @weed_soil_relation["notes"]
      )
    end
  end
end
