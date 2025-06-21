class CreateSoils < ActiveRecord::Migration[7.1]
  def change
    create_table :soils do |t|
      t.integer :pH_level, null: false, default: 1, comment: "pH分類"
      t.integer :drainage, null: false, default: 1, comment: "水はけ"
      t.integer :fertility, null: false, default: 1, comment: "肥沃度"
      t.text :description, null: false, comment: "土壌環境の特徴"
      t.timestamps
    end
  end
end
