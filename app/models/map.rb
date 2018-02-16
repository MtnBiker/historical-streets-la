class Map < ApplicationRecord
  has_and_belongs_to_many :streets
  has_paper_trail
  
  def attribText
    "#{attribLink} #{attrib}"
  end
  
  validates :name, :year, :server_url, presence: true
  validates :name, uniqueness: true
  
  validate :url_has_correct_format
  def url_has_correct_format
    errors.add(:server_url, "Must start with http[s]") unless server_url.to_s.downcase.start_with?('https://', 'http://')
  end
end
