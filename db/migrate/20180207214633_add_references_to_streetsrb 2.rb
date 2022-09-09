class AddReferencesToStreets < ActiveRecord::Migration[5.1]
  def change
    add_column :streets, :references, :text
  end
end
