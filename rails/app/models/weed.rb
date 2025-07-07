class Weed < ApplicationRecord
  has_many :diagnoses
  has_many :weed_soil_relations
  has_many :soils, through: :weed_soil_relations
end
