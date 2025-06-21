class CreateWeedSoilRelations < ActiveRecord::Migration[7.1]
  def change
    create_table :weed_soil_relations do |t|
      t.references :weed, null: false, comment: "雑草ID"
      t.references :soil, null: false, comment: "土壌ID"
      t.float :confidence, null: false, comment: "対応度（確信度）"
      t.text :notes, null: false, comment: "根拠や参考文献"
      t.timestamps
    end
  end
end
