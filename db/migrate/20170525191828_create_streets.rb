class CreateStreets < ActiveRecord::Migration[5.1]
  def change
    create_table :streets do |t|
      t.string :prevName
      t.string :currentName
      t.date :dateEarliest
      t.date :dateLatest
      t.geom :extent
      t.string :numBlocks
      t.text :ref1
      t.text :ref2
      t.text :ref3
      t.text :notes

      t.timestamps
    end
  end
end
