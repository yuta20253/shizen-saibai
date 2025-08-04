class AddUniqueIndexToUsersEmailAndDeletedAt < ActiveRecord::Migration[7.1]
  def change
    add_index :users, [:email, :deleted_at], unique: true, name: "index_users_on_email_and_deleted_at"
  end
end
