class Street < ApplicationRecord
  # has_many :maps
  has_paper_trail 
  validates :prevName, :currentName, presence: true
end
