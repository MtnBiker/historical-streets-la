class Street < ApplicationRecord
  # has_many :maps
  validates :prevName, :currentName, presence: true
end
