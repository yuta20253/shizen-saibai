module Diag
  module Errors
    class ImageMissing < StandardError; end
    class InvalidFileType < StandardError; end
    class FileSizeExceeded < StandardError; end
  end
end
