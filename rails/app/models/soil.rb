class Soil < ApplicationRecord
  has_many :diagnoses, dependent: :destroy
  has_many :weed_soil_relations, dependent: :destroy
  has_many :weeds, through: :weed_soil_relations
  has_many :soil_vegetable_relations, dependent: :destroy
  has_many :vegetables, through: :soil_vegetable_relations

  enum pH_level: {
    extremely_acidic: 0, # 極端に酸性（例: pH < 4.5）
    very_strongly_acidic: 1,
    strongly_acidic: 2,
    moderately_acidic: 3,
    slightly_acidic: 4,
    neutral: 5,
    slightly_alkaline: 6,
    moderately_alkaline: 7,
    strongly_alkaline: 8,
    very_strongly_alkaline: 9, # 非常にアルカリ性（例: pH > 9）
  }

  enum drainage: {
    good: 0,      # 良好
    normal: 1,    # 普通
    poor: 2, # 悪い
  }

  enum fertility: {
    high: 0, # 肥沃
    middle: 1, # 普通
    low: 2, # 痩せた土壌
  }
end
