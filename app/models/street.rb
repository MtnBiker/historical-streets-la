class Street < ApplicationRecord
  has_many :maps
  accepts_nested_attributes_for :maps # I don't think I need this. For a more complex form
end
