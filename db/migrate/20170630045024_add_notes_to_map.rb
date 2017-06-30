class AddNotesToMap < ActiveRecord::Migration[5.1]
  def change
    add_column :maps, :notes, :text
    add_column :maps, :thomasGuide, :string
  end
end
