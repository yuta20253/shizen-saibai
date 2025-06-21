class CreateFeedbacks < ActiveRecord::Migration[7.1]
  def change
    create_table :feedbacks do |t|
      t.references :diagnosis, null: false, comment: "診断ID"
      t.text :feedback_text, null: false, comment: "フリーフォームの意見・感想"
      t.integer :rating, null: false, comment: "評価"
      t.timestamps
    end
  end
end
