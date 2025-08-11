class AddColumnImageUrlToVegetable < ActiveRecord::Migration[7.1]
  def change
    add_column :vegetables, :image_url, :string, null: false, default: "", comment: "野菜の画像URL"
  end
end
