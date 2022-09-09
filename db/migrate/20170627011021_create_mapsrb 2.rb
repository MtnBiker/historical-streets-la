class CreateMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :maps do |t|
      t.string :name
      t.string :year
      t.text :url
      t.text :attribLink
      t.string :attrib

      t.timestamps
    end
  end
end
