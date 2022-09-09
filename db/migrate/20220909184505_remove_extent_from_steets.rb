class RemoveExtentFromSteets < ActiveRecord::Migration[7.0]
  def change
    remove_column :streets, :extent
  end
end
