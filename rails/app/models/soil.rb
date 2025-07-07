class Soil < ApplicationRecord
  has_many :diagnoses
  has_many :weed_soil_relations
  has_many :weeds, through: :weed_soil_relations
  has_many :soil_vegetable_relations
  has_many :vegetables, through: :soil_vegetable_relations
end
