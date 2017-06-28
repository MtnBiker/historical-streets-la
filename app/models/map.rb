class Map < ApplicationRecord
  # belongs_to :streets
  
  def attribText
    "#{attribLink} #{attrib}"
  end
end
