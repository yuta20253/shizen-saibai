class CreateDiagnoses < ActiveRecord::Migration[7.1]
  def change
    create_table :diagnoses do |t|
      t.references :user, null: false, comment: "診断したユーザーID"
      t.references :weed, null: false, comment: "推定された雑草ID"
      t.references :soil, null: false, comment: "推定された土壌ID"
      t.references :vegetable, null: false, comment: "推奨野菜ID"
      t.text :image_url, null: false, comment: "アップロード画像の保存URL"
      t.text :result, null: false, comment: "理由"
      t.timestamps
    end
  end
end
