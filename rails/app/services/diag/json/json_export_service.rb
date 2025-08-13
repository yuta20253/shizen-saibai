class Diag::Json::JsonExportService
  def call
    weeds = Weed.all.map do |weed|
      {
        name: weed.name,
      }
    end
    { weeds_name_to_json: weeds.to_json }
  end
end
