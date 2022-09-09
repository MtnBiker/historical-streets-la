class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
     rename_column :streets, :prevName,     :previous_name
     rename_column :streets, :currentName,  :current_name
     rename_column :streets, :dateEarliest, :date_earliest
     rename_column :streets, :dateLatest,   :date_latest
     rename_column :streets, :where,        :cross_streets
     rename_column :streets, :numBlocks,    :number_of_blocks
  end
end
