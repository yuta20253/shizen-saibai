class CreateVegetables < ActiveRecord::Migration[7.1]
  def change
    create_table :vegetables do |t|
      t.string :name, null: false, comment: "野菜名"
      t.integer :season, null: false, default: 0,comment: "栽培適期"
      t.string :region, null: false, comment: "栽培可能地域"
      t.integer :difficulty, null: false, default: 1, comment: "栽培難易度"
      t.text :description, null: false, comment: "特徴やメモ"
      t.timestamps
    end
  end
end
