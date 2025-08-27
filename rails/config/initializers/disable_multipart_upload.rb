require 'aws-sdk-s3'

module Aws
  module S3
    class Client
      alias_method :original_put_object, :put_object

      def put_object(params)
        # multipart upload をせず、単純なPUTリクエストでアップロードするように
        if params[:body].respond_to?(:size) && params[:body].size >= 5 * 1024 * 1024
          # 5MB以上でも multipart を使わないように paramsを加工
          # 実際には SDK側の multipart の自動切り替えがあるので、
          # put_object にそのまま渡すとmultipartになるのを防ぐ方法として、
          # アップロードサイズが大きくても単純に put_object を使う
          # SDKの内部multipart uploadは別APIなのでこれで回避可能
          # 何もしない（単純に put_object を呼ぶだけ）
          original_put_object(params)
        else
          original_put_object(params)
        end
      end
    end
  end
end
