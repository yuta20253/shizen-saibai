require "active_storage/service/s3_service"

Rails.application.config.to_prepare do
  ActiveStorage::Service::S3Service.class_eval do
    def upload(key, io, checksum: nil, **options)
      Rails.logger.info "[S3 PATCH] single-part upload triggered for key=#{key}"

      # オプションログ出力（診断用）
      Rails.logger.debug("[S3 PATCH] options: #{options.inspect}")

      # content_type を強制的に設定（なければデフォルトで image/jpeg）
      content_type = options[:content_type].presence || "application/octet-stream"

      sanitized_options = options.except(:custom_metadata).merge(content_type: content_type)

      instrument :upload, key: key, checksum: checksum do
        Rails.logger.debug("[S3 PATCH] checksum: #{checksum.inspect}")
        io.rewind if io.respond_to?(:rewind)

        client.client.put_object(
          bucket: bucket.name,
          key: key,
          body: io,
          content_md5: checksum,
          **sanitized_options
        )
      end
    end
  end
end
