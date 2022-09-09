class CreateStreets < ActiveRecord::Migration[5.1]
  def change
    create_table :streets do |t|
      t.string :prevName
      t.string :currentName
      t.string :dateEarliest
      t.string :dateLatest
      t.string :where
      t.line_string :extent
      t.string :numBlocks
      t.text :ref1
      t.text :ref2
      t.text :ref3
      t.text :notes

      t.timestamps
    end
  end
end
