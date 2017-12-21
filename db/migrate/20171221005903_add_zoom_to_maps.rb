class AddZoomToMaps < ActiveRecord::Migration[5.1]
  def change
    add_column :maps, :zoom, :string
  end
end
