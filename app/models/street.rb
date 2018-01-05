class Street < ApplicationRecord
  # has_many :maps
  has_paper_trail
  validates :prevName, :currentName, presence: true
  
  # alias_attribute :first_name, :FirstName
  
  def self.search(search)
    search = "%" + "#{search}" + "%"  # otherwise have to have "%#{search}%" below instead of one word
        # failed when tried "%#{search}%" or '%#{search}%' can put space around between the #{} but then the space is there and don't know if that messes up SQL
    self.where('"streets"."prevName" ILIKE ?' , search)
    # self.where('"streets"."currentName" ILIKE ?' , search)
    # self.where('"streets"."dateEarliest" ILIKE ?' , search)
    # self.where('"streets"."dateLatest" ILIKE ?' , search)
    # self.where("ref1 ILIKE ?", search)
    # self.where("ref2 ILIKE ?", search)
    # self.where("ref3 ILIKE ?", search)
    # self.where("notes ILIKE ?", search)
  end
end


# There is a where field, but it may confuse the search by being a reserve name

# what it looks like in the terminal when done directly as a check
# Street Load (1.0ms)  SELECT "streets".* FROM "streets" WHERE (notes ILIKE '%ocean%')

# where("prevName ILIKE ?", "%#{search}%")
 
# self.where('"courses"."Title" LIKE ?', "%#{search}%")
#  Fixing camelCased fields problem
# https://stackoverflow.com/questions/35517340/pgundefinedcolumn-error-column-title-does-not-exist
# self.where('"courses"."Title" LIKE ?', "%#{search}%")