class Street < ApplicationRecord
  # has_many :maps
  has_paper_trail
  validates :previous_name, :current_name, presence: true
  # before_save :json_to_geojson # or create or update
  # before_save :calculate_length # of segment
# Used by search on streets>index. Maybe came from here https://stackoverflow.com/questions/39685055/self-search-body-rails
  def self.search(search)
    where("previous_name ILIKE ? OR current_name ILIKE ? OR date_earliest ILIKE ? OR date_latest ILIKE ? OR cross_streets ILIKE ? OR ref1 ILIKE ? OR ref2 ILIKE ? OR ref3 ILIKE ? OR notes ILIKE ?", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%").order("previous_name","current_name")
  end

end
