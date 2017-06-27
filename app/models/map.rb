class Map < ApplicationRecord
  belongs_to :street
  
  def attribText
    "#{attribLink} #{attrib}"
  end
end
