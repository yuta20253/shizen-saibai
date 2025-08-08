soils = [
  # pH_level: 0 (極端に強い酸性)
  { pH_level: 0, drainage: 0, fertility: 0, description: "極端に強い酸性で水はけ悪く肥沃度低い。特殊な酸性湿地向け。" },
  { pH_level: 0, drainage: 0, fertility: 1, description: "極端に強い酸性で水はけ悪く肥沃度普通。酸性耐性のある湿地植物向け。" },
  { pH_level: 0, drainage: 0, fertility: 2, description: "極端に強い酸性で水はけ悪く肥沃度高い。酸性湿地の特殊環境。" },
  { pH_level: 0, drainage: 1, fertility: 0, description: "極端に強い酸性で水はけ普通、肥沃度低い。酸性耐性作物に限定的適合。" },
  { pH_level: 0, drainage: 1, fertility: 1, description: "極端に強い酸性で水はけ普通、肥沃度普通。酸性に強い植物向きの土壌。" },
  { pH_level: 0, drainage: 1, fertility: 2, description: "極端に強い酸性で水はけ普通、肥沃度高い。肥沃な酸性土壌環境。" },
  { pH_level: 0, drainage: 2, fertility: 0, description: "極端に強い酸性で水はけ良好、肥沃度低い。良排水の酸性土壌。" },
  { pH_level: 0, drainage: 2, fertility: 1, description: "極端に強い酸性で水はけ良好、肥沃度普通。酸性耐性作物向けの良排水土壌。" },
  { pH_level: 0, drainage: 2, fertility: 2, description: "極端に強い酸性で水はけ良好、肥沃度高い。肥沃で排水良好な酸性土壌。" },

  # pH_level: 1 (非常に強い酸性)
  { pH_level: 1, drainage: 0, fertility: 0, description: "非常に強い酸性で水はけ悪く肥沃度低い。酸性湿地向け環境。" },
  { pH_level: 1, drainage: 0, fertility: 1, description: "非常に強い酸性で水はけ悪く肥沃度普通。酸性耐性植物向き。" },
  { pH_level: 1, drainage: 0, fertility: 2, description: "非常に強い酸性で水はけ悪く肥沃度高い。酸性環境の肥沃湿地。" },
  { pH_level: 1, drainage: 1, fertility: 0, description: "非常に強い酸性で水はけ普通、肥沃度低い。酸性耐性作物向け。" },
  { pH_level: 1, drainage: 1, fertility: 1, description: "非常に強い酸性で水はけ普通、肥沃度普通。酸性耐性植物の適地。" },
  { pH_level: 1, drainage: 1, fertility: 2, description: "非常に強い酸性で水はけ普通、肥沃度高い。肥沃な酸性土壌環境。" },
  { pH_level: 1, drainage: 2, fertility: 0, description: "非常に強い酸性で水はけ良好、肥沃度低い。排水の良い酸性土壌。" },
  { pH_level: 1, drainage: 2, fertility: 1, description: "非常に強い酸性で水はけ良好、肥沃度普通。良排水の酸性耐性土壌。" },
  { pH_level: 1, drainage: 2, fertility: 2, description: "非常に強い酸性で水はけ良好、肥沃度高い。肥沃で排水良好な酸性土壌。" },

  # pH_level: 2 (強酸性)
  { pH_level: 2, drainage: 0, fertility: 0, description: "強酸性で水はけ悪く肥沃度低い。酸性植物向き湿地環境。" },
  { pH_level: 2, drainage: 0, fertility: 1, description: "強酸性で水はけ悪く肥沃度普通。酸性耐性作物向け湿潤土壌。" },
  { pH_level: 2, drainage: 0, fertility: 2, description: "強酸性で水はけ悪く肥沃度高い。肥沃な酸性湿地土壌。" },
  { pH_level: 2, drainage: 1, fertility: 0, description: "強酸性で水はけ普通、肥沃度低い。酸性耐性作物向き土壌。" },
  { pH_level: 2, drainage: 1, fertility: 1, description: "強酸性で水はけ普通、肥沃度普通。多くの酸性耐性作物に適する。" },
  { pH_level: 2, drainage: 1, fertility: 2, description: "強酸性で水はけ普通、肥沃度高い。肥沃な酸性土壌環境。" },
  { pH_level: 2, drainage: 2, fertility: 0, description: "強酸性で水はけ良好、肥沃度低い。良排水の酸性土壌。" },
  { pH_level: 2, drainage: 2, fertility: 1, description: "強酸性で水はけ良好、肥沃度普通。排水良好な酸性耐性土壌。" },
  { pH_level: 2, drainage: 2, fertility: 2, description: "強酸性で水はけ良好、肥沃度高い。肥沃で良排水の酸性土壌。" },
  # pH_level: 3 (やや強い酸性)
  { pH_level: 3, drainage: 0, fertility: 0, description: "やや強い酸性で水はけ悪く肥沃度低い。酸性植物の湿地環境。" },
  { pH_level: 3, drainage: 0, fertility: 1, description: "やや強い酸性で水はけ悪く肥沃度普通。湿潤な酸性耐性植物向け。" },
  { pH_level: 3, drainage: 0, fertility: 2, description: "やや強い酸性で水はけ悪く肥沃度高い。肥沃な酸性湿地土壌。" },
  { pH_level: 3, drainage: 1, fertility: 0, description: "やや強い酸性で水はけ普通、肥沃度低い。酸性耐性作物向け土壌。" },
  { pH_level: 3, drainage: 1, fertility: 1, description: "やや強い酸性で水はけ普通、肥沃度普通。多くの酸性耐性作物に適応。" },
  { pH_level: 3, drainage: 1, fertility: 2, description: "やや強い酸性で水はけ普通、肥沃度高い。肥沃な酸性土壌環境。" },
  { pH_level: 3, drainage: 2, fertility: 0, description: "やや強い酸性で水はけ良好、肥沃度低い。良排水の酸性土壌。" },
  { pH_level: 3, drainage: 2, fertility: 1, description: "やや強い酸性で水はけ良好、肥沃度普通。良排水の酸性耐性土壌。" },
  { pH_level: 3, drainage: 2, fertility: 2, description: "やや強い酸性で水はけ良好、肥沃度高い。肥沃で良排水の酸性土壌。" },

  # pH_level: 4 (中性寄りの弱酸性)
  { pH_level: 4, drainage: 0, fertility: 0, description: "中性寄りの弱酸性で水はけ悪く肥沃度低い。湿地環境。" },
  { pH_level: 4, drainage: 0, fertility: 1, description: "中性寄りの弱酸性で水はけ悪く肥沃度普通。湿潤な土壌環境。" },
  { pH_level: 4, drainage: 0, fertility: 2, description: "中性寄りの弱酸性で水はけ悪く肥沃度高い。肥沃な湿地土壌。" },
  { pH_level: 4, drainage: 1, fertility: 0, description: "中性寄りの弱酸性で水はけ普通、肥沃度低い。多くの作物に適応可能。" },
  { pH_level: 4, drainage: 1, fertility: 1, description: "中性寄りの弱酸性で水はけ普通、肥沃度普通。一般的な農耕地土壌。" },
  { pH_level: 4, drainage: 1, fertility: 2, description: "中性寄りの弱酸性で水はけ普通、肥沃度高い。肥沃な農耕地土壌。" },
  { pH_level: 4, drainage: 2, fertility: 0, description: "中性寄りの弱酸性で水はけ良好、肥沃度低い。良排水の軽い土壌。" },
  { pH_level: 4, drainage: 2, fertility: 1, description: "中性寄りの弱酸性で水はけ良好、肥沃度普通。広範囲の作物に適する土壌。" },
  { pH_level: 4, drainage: 2, fertility: 2, description: "中性寄りの弱酸性で水はけ良好、肥沃度高い。肥沃で良排水の理想的土壌。" },

  # pH_level: 5 (弱アルカリ性)
  { pH_level: 5, drainage: 0, fertility: 0, description: "弱アルカリ性で水はけ悪く肥沃度低い。石灰質湿地に近い環境。" },
  { pH_level: 5, drainage: 0, fertility: 1, description: "弱アルカリ性で水はけ悪く肥沃度普通。湿潤な石灰質土壌。" },
  { pH_level: 5, drainage: 0, fertility: 2, description: "弱アルカリ性で水はけ悪く肥沃度高い。肥沃な石灰質湿地土壌。" },
  { pH_level: 5, drainage: 1, fertility: 0, description: "弱アルカリ性で水はけ普通、肥沃度低い。石灰質土壌に強い植物向け。" },
  { pH_level: 5, drainage: 1, fertility: 1, description: "弱アルカリ性で水はけ普通、肥沃度普通。多くの石灰質耐性作物向け。" },
  { pH_level: 5, drainage: 1, fertility: 2, description: "弱アルカリ性で水はけ普通、肥沃度高い。肥沃な石灰質土壌環境。" },
  { pH_level: 5, drainage: 2, fertility: 0, description: "弱アルカリ性で水はけ良好、肥沃度低い。石灰質良排水土壌。" },
  { pH_level: 5, drainage: 2, fertility: 1, description: "弱アルカリ性で水はけ良好、肥沃度普通。幅広い作物に適応可能。" },
  { pH_level: 5, drainage: 2, fertility: 2, description: "弱アルカリ性で水はけ良好、肥沃度高い。肥沃で良排水の石灰質土壌。" },

  # pH_level: 6 (中程度のアルカリ性)
  { pH_level: 6, drainage: 0, fertility: 0, description: "中程度のアルカリ性で水はけ悪く肥沃度低い。石灰岩地域の湿地環境。" },
  { pH_level: 6, drainage: 0, fertility: 1, description: "中程度のアルカリ性で水はけ悪く肥沃度普通。湿潤な石灰岩土壌。" },
  { pH_level: 6, drainage: 0, fertility: 2, description: "中程度のアルカリ性で水はけ悪く肥沃度高い。肥沃な石灰岩湿地土壌。" },
  { pH_level: 6, drainage: 1, fertility: 0, description: "中程度のアルカリ性で水はけ普通、肥沃度低い。石灰岩地帯の乾燥土壌。" },
  { pH_level: 6, drainage: 1, fertility: 1, description: "中程度のアルカリ性で水はけ普通、肥沃度普通。一般的な石灰岩土壌。" },
  { pH_level: 6, drainage: 1, fertility: 2, description: "中程度のアルカリ性で水はけ普通、肥沃度高い。肥沃な石灰岩農耕地。" },
  { pH_level: 6, drainage: 2, fertility: 0, description: "中程度のアルカリ性で水はけ良好、肥沃度低い。乾燥した良排水土壌。" },
  { pH_level: 6, drainage: 2, fertility: 1, description: "中程度のアルカリ性で水はけ良好、肥沃度普通。乾燥気味の肥沃土壌。" },
  { pH_level: 6, drainage: 2, fertility: 2, description: "中程度のアルカリ性で水はけ良好、肥沃度高い。肥沃で乾燥気味の良排水土壌。" },

  # pH_level: 7 (強いアルカリ性)
  { pH_level: 7, drainage: 0, fertility: 0, description: "強いアルカリ性で水はけ悪く肥沃度低い。石灰岩の極端な湿地環境。" },
  { pH_level: 7, drainage: 0, fertility: 1, description: "強いアルカリ性で水はけ悪く肥沃度普通。石灰岩の湿地土壌。" },
  { pH_level: 7, drainage: 0, fertility: 2, description: "強いアルカリ性で水はけ悪く肥沃度高い。肥沃な石灰岩湿地土壌。" },
  { pH_level: 7, drainage: 1, fertility: 0, description: "強いアルカリ性で水はけ普通、肥沃度低い。石灰岩地域の乾燥土壌。" },
  { pH_level: 7, drainage: 1, fertility: 1, description: "強いアルカリ性で水はけ普通、肥沃度普通。石灰岩地域の一般土壌。" },
  { pH_level: 7, drainage: 1, fertility: 2, description: "強いアルカリ性で水はけ普通、肥沃度高い。肥沃な石灰岩農耕地。" },
  { pH_level: 7, drainage: 2, fertility: 0, description: "強いアルカリ性で水はけ良好、肥沃度低い。乾燥した良排水土壌。" },
  { pH_level: 7, drainage: 2, fertility: 1, description: "強いアルカリ性で水はけ良好、肥沃度普通。乾燥気味の肥沃土壌。" },
  { pH_level: 7, drainage: 2, fertility: 2, description: "強いアルカリ性で水はけ良好、肥沃度高い。肥沃で乾燥気味の良排水土壌。" },

  # pH_level: 8 (非常に強いアルカリ性)
  { pH_level: 8, drainage: 0, fertility: 0, description: "非常に強いアルカリ性で水はけ悪く肥沃度低い。石灰岩の極端湿地。" },
  { pH_level: 8, drainage: 0, fertility: 1, description: "非常に強いアルカリ性で水はけ悪く肥沃度普通。石灰岩湿地土壌。" },
  { pH_level: 8, drainage: 0, fertility: 2, description: "非常に強いアルカリ性で水はけ悪く肥沃度高い。肥沃な石灰岩湿地。" },
  { pH_level: 8, drainage: 1, fertility: 0, description: "非常に強いアルカリ性で水はけ普通、肥沃度低い。石灰岩乾燥土壌。" },
  { pH_level: 8, drainage: 1, fertility: 1, description: "非常に強いアルカリ性で水はけ普通、肥沃度普通。石灰岩一般土壌。" },
  { pH_level: 8, drainage: 1, fertility: 2, description: "非常に強いアルカリ性で水はけ普通、肥沃度高い。肥沃な石灰岩農耕地。" },
  { pH_level: 8, drainage: 2, fertility: 0, description: "非常に強いアルカリ性で水はけ良好、肥沃度低い。乾燥良排水土壌。" },
  { pH_level: 8, drainage: 2, fertility: 1, description: "非常に強いアルカリ性で水はけ良好、肥沃度普通。乾燥肥沃土壌。" },
  { pH_level: 8, drainage: 2, fertility: 2, description: "非常に強いアルカリ性で水はけ良好、肥沃度高い。肥沃で乾燥良排水土壌。" },

  # pH_level: 9 (極端なアルカリ性)
  { pH_level: 9, drainage: 0, fertility: 0, description: "極端なアルカリ性で水はけ悪く肥沃度低い。石灰岩の過酷な湿地環境。" },
  { pH_level: 9, drainage: 0, fertility: 1, description: "極端なアルカリ性で水はけ悪く肥沃度普通。過酷な石灰岩湿地土壌。" },
  { pH_level: 9, drainage: 0, fertility: 2, description: "極端なアルカリ性で水はけ悪く肥沃度高い。肥沃な過酷石灰岩湿地。" },
  { pH_level: 9, drainage: 1, fertility: 0, description: "極端なアルカリ性で水はけ普通、肥沃度低い。乾燥石灰岩土壌。" },
  { pH_level: 9, drainage: 1, fertility: 1, description: "極端なアルカリ性で水はけ普通、肥沃度普通。過酷な石灰岩土壌。" },
  { pH_level: 9, drainage: 1, fertility: 2, description: "極端なアルカリ性で水はけ普通、肥沃度高い。肥沃な過酷石灰岩農耕地。" },
  { pH_level: 9, drainage: 2, fertility: 0, description: "極端なアルカリ性で水はけ良好、肥沃度低い。乾燥良排水土壌。" },
  { pH_level: 9, drainage: 2, fertility: 1, description: "極端なアルカリ性で水はけ良好、肥沃度普通。乾燥肥沃土壌。" },
  { pH_level: 9, drainage: 2, fertility: 2, description: "極端なアルカリ性で水はけ良好、肥沃度高い。肥沃で乾燥良排水土壌。" },
]

soils.each do |soil|
  Soil.create!(soil)
end
