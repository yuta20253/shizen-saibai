class Diag::Db::SaveRecordService
  def initialize(vegetable_name:, weed_name:, soil_data:, reason:, current_user:, image_file: nil)
    @vegetable = Vegetable.find_by(name: vegetable_name)
    raise ActiveRecord::RecordNotFound, "野菜データ、#{vegetable_name}が見つかりません。" unless @vegetable

    @weed = Weed.find_by(name: weed_name)
    raise ActiveRecord::RecordNotFound, "雑草データ、#{weed_name}が見つかりません。" unless @weed

    @soil = Soil.where(pH_level: soil_data[:pH_level]).where(drainage: soil_data[:drainage]).where(fertility: soil_data[:fertility]).first
    raise ActiveRecord::RecordNotFound, "土壌データが見つかりません。" unless @soil

    @reason = reason

    @user = current_user

    @image_file = image_file
  end

  def call
    ActiveRecord::Base.transaction do
      SoilVegetableRelation.create!(
        soil_id: @soil.id,
        vegetable_id: @vegetable.id,
        reason: @reason,
      )
      WeedSoilRelation.create!(
        weed_id: @weed.id,
        soil_id: @soil.id,
        notes: @reason,
      )
      @diagnosis = Diagnosis.create!(
        user_id: @user.id,
        weed_id: @weed.id,
        soil_id: @soil.id,
        vegetable_id: @vegetable.id,
        image_url: "",
        result: @reason,
      )

      if @image_file.present?
        tempfile = @image_file.respond_to?(:tempfile) ? @image_file.tempfile : @image_file
        Rails.logger.debug("@image_file.class: #{@image_file.class}")
        Rails.logger.debug("@image_file.original_filename: #{@image_file.original_filename rescue 'N/A'}")
        Rails.logger.debug("@image_file.size: #{@image_file.size rescue 'N/A'}")
        @diagnosis.image.attach(
          io: tempfile,
          filename: @image_file.original_filename,
          content_type: @image_file.content_type || 'image/jpeg' # fallback
        )
      end
    end
    { id: @diagnosis.id }
  rescue => e
    Rails.logger.error("SaveRecordService エラー発生: #{e.class} - #{e.message}")
    Rails.logger.error(e.backtrace.join("\n"))
    raise e
  end
end
