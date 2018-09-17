class AddIndexToEntriesTable < ActiveRecord::Migration[5.2]
  def change
    add_column :entries, :entry_id, :string
    add_index :entries, [:entry_id], unique: true
  end
end
