class Diag::Db::SaveRecordService
  def initialize(vegetable_name:, weed_name:, soil_data:, reason:, current_user:, image_file:)
    @vegetable = Vegetable.find_by(name: vegetable_name)
    raise ActiveRecord::RecordNotFound, "野菜データ、#{vegetable_name}が見つかりません。" unless @vegetable

    @weed = Weed.find_by(name: weed_name)
    raise ActiveRecord::RecordNotFound, "雑草データ、#{weed_name}が見つかりません。" unless @weed

    @soil = Soil.where(pH_level: soil_data[:pH_level]).where(drainage: soil_data[:drainage]).where(fertility: soil_data[:fertility]).first
    raise ActiveRecord::RecordNotFound, "土壌データが見つかりません。" unless @soil

    @reason = reason

    @user = current_user

    # 17 ~ 20行目と44行目があるとエラーが出る(500エラー)
    @image_file = image_file

    @s3 = Aws::S3::Resource.new
    @bucket = @s3.bucket(ENV["SAKURA_BUCKET"])
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
      Rails.logger.info("Diagnosis 作成完了: ID=#{@diagnosis.id}")
    end

    Rails.logger.info("image_file クラス: #{@image_file.class}")
    Rails.logger.info("original_filename: #{@image_file.respond_to?(:original_filename) ? @image_file.original_filename : '×'}")
    Rails.logger.info("tempfile: #{@image_file.respond_to?(:tempfile) ? @image_file.tempfile.class : '×'}")

    upload_image_to_s3(@image_file)

    { id: @diagnosis.id }
  rescue => e
    Rails.logger.error("SaveRecordService エラー発生: #{e.class} - #{e.message}")
    Rails.logger.error(e.backtrace.join("\n"))
    raise e
  end

  private

    def upload_image_to_s3(file)
      key = "uploads/#{SecureRandom.uuid}_#{file.original_filename}"
      obj = @bucket.object(key)

      Rails.logger.info("📤 S3アップロード開始: #{key}")

      success = obj.upload_file(file.tempfile, acl: "public-read")
      unless success
        raise "S3への画像アップロードに失敗しました"
      end

      url = obj.public_url
      Rails.logger.info("✅ S3アップロード完了: #{url}")
      url
    end
end
