class Diag::File::FileUploadService
  def initialize(file)
    @file = file
  end

  def call
    file_type = ["image/jpeg", "image/png"]
    max_size = 5.megabytes

    # ファイル形式が不正
    Rails.logger.debug("アップロードされたファイル: #{@file.inspect}")
    raise Diag::Errors::ImageMissing, "画像が選択されていません" if @file.blank?

    unless file_type.include?(@file.content_type)
      raise Diag::Errors::InvalidFileType, "ファイル形式が不正です"
    end

    # ファイルサイズ超過
    if @file.size > max_size
      raise Diag::Errors::FileSizeExceeded, "ファイルサイズが大きすぎます"
    end

    @file.rewind
    base64_image = Base64.strict_encode64(@file.read)
    "data:image/jpeg;base64,#{base64_image}"
  end
end
