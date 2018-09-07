class UpdateUserTableForJwtOnly < ActiveRecord::Migration[5.2]
  def change  
    remove_index :users, column: :perishable_token
    remove_index :users, column: :persistence_token
    remove_index :users, column: :single_access_token

    remove_column :users, :persistence_token, :string
    remove_column :users, :single_access_token, :string
    remove_column :users, :perishable_token, :string
  end
end
