# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_08_05_130524) do
  create_table "diagnoses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false, comment: "診断したユーザーID"
    t.bigint "weed_id", null: false, comment: "推定された雑草ID"
    t.bigint "soil_id", null: false, comment: "推定された土壌ID"
    t.bigint "vegetable_id", null: false, comment: "推奨野菜ID"
    t.text "image_url", null: false, comment: "アップロード画像の保存URL"
    t.text "result", null: false, comment: "理由"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["soil_id"], name: "index_diagnoses_on_soil_id"
    t.index ["user_id"], name: "index_diagnoses_on_user_id"
    t.index ["vegetable_id"], name: "index_diagnoses_on_vegetable_id"
    t.index ["weed_id"], name: "index_diagnoses_on_weed_id"
  end

  create_table "feedbacks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "diagnosis_id", null: false, comment: "診断ID"
    t.text "feedback_text", null: false, comment: "フリーフォームの意見・感想"
    t.integer "rating", null: false, comment: "評価"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["diagnosis_id"], name: "index_feedbacks_on_diagnosis_id"
  end

  create_table "soil_vegetable_relations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "soil_id", null: false, comment: "土壌ID"
    t.bigint "vegetable_id", null: false, comment: "野菜ID"
    t.text "reason", null: false, comment: "選定理由(表示用)"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["soil_id"], name: "index_soil_vegetable_relations_on_soil_id"
    t.index ["vegetable_id"], name: "index_soil_vegetable_relations_on_vegetable_id"
  end

  create_table "soils", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "pH_level", default: 1, null: false, comment: "pH分類"
    t.integer "drainage", default: 1, null: false, comment: "水はけ"
    t.integer "fertility", default: 1, null: false, comment: "肥沃度"
    t.text "description", null: false, comment: "土壌環境の特徴"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false, comment: "名前"
    t.integer "role", default: 0, null: false, comment: "管理者区分"
    t.string "jti", null: false, comment: " JWT識別子"
    t.string "email", null: false, comment: "メールアドレス"
    t.string "encrypted_password", null: false, comment: "パスワード"
    t.string "reset_password_token", comment: "パスワード再設定トークン"
    t.datetime "reset_password_sent_at", comment: "パスワード再設定メール送信日時"
    t.datetime "remember_created_at", comment: "ログイン記憶設定日時"
    t.string "confirmation_token", comment: "メール確認トークン"
    t.datetime "confirmed_at", comment: "メール確認完了日時"
    t.datetime "confirmation_sent_at", comment: "メール確認送信日時"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "unconfirmed_email"
    t.datetime "deleted_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "vegetables", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false, comment: "野菜名"
    t.integer "season", default: 0, null: false, comment: "栽培適期"
    t.string "region", null: false, comment: "栽培可能地域"
    t.integer "difficulty", default: 1, null: false, comment: "栽培難易度"
    t.text "description", null: false, comment: "特徴やメモ"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weed_soil_relations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "weed_id", null: false, comment: "雑草ID"
    t.bigint "soil_id", null: false, comment: "土壌ID"
    t.text "notes", null: false, comment: "根拠や参考文献"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["soil_id"], name: "index_weed_soil_relations_on_soil_id"
    t.index ["weed_id"], name: "index_weed_soil_relations_on_weed_id"
  end

  create_table "weeds", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false, comment: "雑草名"
    t.string "scientific_name", null: false, comment: "学名"
    t.text "image_url", null: false, comment: "代表画像URL"
    t.text "description", null: false, comment: "雑草の説明"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "soil_vegetable_relations", "soils"
  add_foreign_key "soil_vegetable_relations", "vegetables"
end
