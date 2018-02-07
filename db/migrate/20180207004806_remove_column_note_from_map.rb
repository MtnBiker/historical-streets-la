class RemoveColumnNoteFromMap < ActiveRecord::Migration[5.1]
  def change
    remove_column :maps, :Note
  end
end
