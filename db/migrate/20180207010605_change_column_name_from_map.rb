class ChangeColumnNameFromMap < ActiveRecord::Migration[5.1]
  def change
    rename_column :maps, :long_name, :title
  end
end
