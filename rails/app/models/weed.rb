class Weed < ApplicationRecord
  has_many :diagnoses, dependent: :destroy
  has_many :weed_soil_relations, dependent: :destroy
  has_many :soils, through: :weed_soil_relations
end
