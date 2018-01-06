class Street < ApplicationRecord
  # has_many :maps
  has_paper_trail
  validates :previous_name, :current_name, presence: true

  def self.search(search)
    where("previous_name ILIKE ? OR current_name ILIKE ? OR date_earliest ILIKE ? OR date_latest ILIKE ? OR cross_streets ILIKE ? OR ref1 ILIKE ? OR ref2 ILIKE ? OR ref3 ILIKE ? OR notes ILIKE ?", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%")     
  end

end
