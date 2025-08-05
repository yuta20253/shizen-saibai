class Diag::Json::JsonExportService
  def call
    weeds = Weed.all.map do |weed|
      {
        name: weed.name,
        scientific_name: weed.scientific_name,
        image_url: weed.image_url,
        description: weed.description
      }
    end
    return { weeds_to_json: weeds.to_json }
  end
end
