class AddNoteToMap < ActiveRecord::Migration[5.1]
  def change
    add_column :maps, :Note, :text
    add_column :maps, :ThomasGuide, :string
  end
end
