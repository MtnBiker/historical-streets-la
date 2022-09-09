class AddLongNameToMap < ActiveRecord::Migration[5.1]
  def change
    add_column :maps, :long_name, :text
    add_column :maps, :source_url, :text
    rename_column :maps, :url, :server_url
    remove_column :maps, :thomasGuide
    remove_column :maps, :ThomasGuide
  end
end


# rails generate migration add_long_name_to_map long_name:text. except for the deletion