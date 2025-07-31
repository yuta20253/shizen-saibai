class SoilVegetableRelation < ApplicationRecord
  belongs_to :soil
  belongs_to :vegetable

  enum suitability: {
    high: 0, # 高
    middle: 1, # 中
    low: 2 # 低
  }
end
