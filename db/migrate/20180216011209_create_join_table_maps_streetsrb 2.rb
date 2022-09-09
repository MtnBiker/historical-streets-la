class CreateJoinTableMapsStreets < ActiveRecord::Migration[5.1]
  def change
    create_join_table :maps, :streets do |t|
      t.index [:map_id, :street_id]
      t.index [:street_id, :map_id]
    end
  end
end
