class Diagnosis::Json::JsonExportService
  def call
    vegetables = Vegetable.all.map do |vegetable|
      {
        name: vegetable.name,
        season: vegetable.season,
        region: vegetable.region,
        difficulty: vegetable.difficulty,
        description: vegetable.description
      }
    end

    weeds = Weed.all.map do |weed|
      {
        name: weed.name,
        scientific_name: weed.scientific_name,
        image_url: weed.image_url,
        description: weed.description
      }
    end

    soils = Soil.all.map do |soil|
      {
        pH_level: soil.pH_level,
        drainage: soil.drainage,
        fertility: soil.fertility,
        description: soil.description
      }
    end
    # return { vegetables: vegetables, weeds: weeds, soils: soils }
    return { vegetables_to_json: vegetables.to_json, weeds_to_json: weeds.to_json, soils_to_json: soils.to_json }
  end
end
