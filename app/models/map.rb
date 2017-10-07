class Map < ApplicationRecord
  # belongs_to :streets
  has_paper_trail
  
  def attribText
    "#{attribLink} #{attrib}"
  end
  
  validates :name, :year, :url, presence: true
  validates :name, uniqueness: true
  
  validate :url_has_correct_format
  def url_has_correct_format
    errors.add(:url, "Must start with http[s]") unless url.to_s.downcase.start_with?('https://', 'http://')
  end
end
