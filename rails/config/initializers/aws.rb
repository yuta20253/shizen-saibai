Aws.config.update({
  region: "jp-north-1",
  credentials: Aws::Credentials.new(ENV["SAKURA_ACCESS_KEY"], ENV["SAKURA_SECRET_KEY"]),
  endpoint: "https://s3.example.sakurastorage.jp",
  force_path_style: true
})
