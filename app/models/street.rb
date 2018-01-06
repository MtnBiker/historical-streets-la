class Street < ApplicationRecord
  # has_many :maps
  has_paper_trail
  validates :prevName, :currentName, presence: true
  
  # alias_attribute :first_name, :FirstName
  
  # def self.search(search)
  #   search = "%" + "#{search}" + "%"  # otherwise have to have "%#{search}%" below instead of one word
  #       # failed when tried "%#{search}%" or '%#{search}%' can put space around between the #{} but then the space is there and don't know if that messes up SQL
  #       # More complicated syntax is needed for camelCase fields. But seems to be needed for all fields. If use shorter syntax those fields are missed--not sure what's going on ref1, ref2 and ref3 don't seem to be being searched.
  #       # Ahh, only searching on the last field in the list
  #   self.where('"streets"."prevName" ILIKE ?' , search)
  #   self.where('"streets"."currentName" ILIKE ?' , search)
  #   self.where('"streets"."dateEarliest" ILIKE ?' , search)
  #   self.where('"streets"."dateLatest" ILIKE ?' , search)
  #   self.where('"streets"."ref1" ILIKE ?', search)
  #   self.where('"streets"."ref2" ILIKE ?', search)
  #   self.where('"streets"."ref3" ILIKE ?', search)
  #   self.where('"streets"."notes" ILIKE ?', search)
  #   self.where('"streets"."where" ILIKE ?', search)
  # end
  
  def self.search(search)
    where("ref1 ILIKE ? OR ref2 ILIKE ? OR ref3 ILIKE ? OR notes ILIKE ?", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%")     
  end

# Trying a different concatenation of multiple. Didn't work
  # def self.search(search)
  #   search = "%" + "#{search}" + "%"  # otherwise have to have "%#{search}%" below instead of one word
  #       # failed when tried "%#{search}%" or '%#{search}%' can put space around between the #{} but then the space is there and don't know if that messes up SQL
  #       # More complicated syntax is needed for camelCase fields. But seems to be needed for all fields. If use shorter syntax those fields are missed--not sure what's going on ref1, ref2 and ref3 don't seem to be being searched. Ahh, only searching on the last field in the list
  #   # self.where('"streets"."prevName" ILIKE ?' OR '"streets"."currentName" ILIKE ?', search, search) # syntax error, unexpected tCONSTANT, expecting ')' treets"."prevName" ILIKE ?' OR '"streets"."currentName" ILIK
  #   self.where('"streets"."where" ILIKE ?', search); # this does work
  # end
  
end


# There is a where field, but it may confuse the search by being a reserve name

# what it looks like in the terminal when done directly as a check
# Street Load (1.0ms)  SELECT "streets".* FROM "streets" WHERE (notes ILIKE '%ocean%')

# where("prevName ILIKE ?", "%#{search}%")
 
# self.where('"courses"."Title" LIKE ?', "%#{search}%")
#  Fixing camelCased fields problem
# https://stackoverflow.com/questions/35517340/pgundefinedcolumn-error-column-title-does-not-exist
# self.where('"courses"."Title" LIKE ?', "%#{search}%")