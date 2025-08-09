require "json"
class Diag::Json::SearchWeedService
  def initialize(data)
    @data = data
  end

  def call
    file_path = Rails.root.join("lib", "json", "weed_vegetable_relations.json")
    json_data = JSON.parse(File.read(file_path))
    matched_data = json_data.find {|data| data["weed_name"] == @data["weed_name"] }

    return nil unless matched_data

    vegetable_name = matched_data["vegetable"]
    weed_name = matched_data["weed_name"]
    reason = matched_data["reason"]

    soil_data = {
      pH_level: matched_data["pH_level"].to_i,
      drainage: matched_data["drainage"].to_i,
      fertility: matched_data["fertility"].to_i,
    }

    return vegetable_name, weed_name, soil_data, reason
  end
end
