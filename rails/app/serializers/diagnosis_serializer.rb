class DiagnosisSerializer < ActiveModel::Serializer
  attributes :id, :diagnosed_at, :image_url, :weed_name, :weed_description, :soil_type,
             :soil_description, :recommended_vegetable, :vegetable_difficulty, :vegetable_season, :vegetable_description, :result

  def diagnosed_at
    object.created_at.iso8601
  end

  def image_url
    object.image_url
  end

  def weed_name
    object.weed&.name
  end

  def weed_description
    object.weed&.description
  end

  def soil_type
    object.soil&.pH_level_before_type_cast || 10
  end

  def soil_description
    object.soil&.description
  end

  def recommended_vegetable
    object.vegetable&.name
  end

  def vegetable_difficulty
    case object.vegetable&.difficulty
    when 0 then "易"
    when 1 then "普"
    when 2 then "難"
    else "不明"
    end
  end

  def vegetable_season
    case object.vegetable&.season
    when 0 then ["春"]
    when 1 then ["夏"]
    when 2 then ["秋"]
    when 3 then ["冬"]
    else []
    end
  end

  def vegetable_description
    object.vegetable&.description
  end
end
