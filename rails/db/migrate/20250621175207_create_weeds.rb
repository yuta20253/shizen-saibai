class CreateWeeds < ActiveRecord::Migration[7.1]
  def change
    create_table :weeds do |t|
      t.string :name, null: false, comment: "雑草名"
      t.string :scientific_name, null: false, comment: "学名"
      t.text :image_url, null: false, comment: "代表画像URL"
      t.text :description, null: false, comment: "雑草の説明"
      t.timestamps
    end
  end
end
