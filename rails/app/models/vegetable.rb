class Vegetable < ApplicationRecord
  has_many :diagnoses, dependent: :destroy
  has_many :soil_vegetable_relations, dependent: :destroy
  has_many :soils, through: :soil_vegetable_relations
end
