class CreateSoilVegetableRelations < ActiveRecord::Migration[7.1]
  def change
    create_table :soil_vegetable_relations do |t|
      t.references :soil, null: false, foreign_key: true, comment: "土壌ID"
      t.references :vegetable, null: false, foreign_key: true, comment: "野菜ID"
      t.integer :suitability, null: false, default: 1, comment: "適性度"
      t.text :reason, null: false, comment: "選定理由(表示用)"
      t.timestamps
    end
  end
end
