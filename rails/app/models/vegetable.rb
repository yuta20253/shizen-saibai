class Vegetable < ApplicationRecord
  has_many :diagnoses
  has_many :soil_vegetable_relations
  has_many :soils, through: :soil_vegetable_relations
end
