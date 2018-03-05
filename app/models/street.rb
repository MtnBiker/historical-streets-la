class Street < ApplicationRecord
  has_and_belongs_to_many :maps
  has_paper_trail
  validates :previous_name, :current_name, presence: true
  # before_save :json_to_geojson # or create or update
  # before_save :calculate_length # of segment
  
  # set_rgeo_factory_for_column(:extent, RGeo::Geographic.spherical_factory(:srid => 4326)) # http://daniel-azuma.com/articles/georails/part-3 if I decide to use this column
      
# Used by search on streets>index. Maybe came from here https://stackoverflow.com/questions/39685055/self-search-body-rails
  def self.search(search)
    where("previous_name ILIKE ? OR current_name ILIKE ? OR date_earliest ILIKE ? OR date_latest ILIKE ? OR cross_streets ILIKE ? OR ref1 ILIKE ? OR ref2 ILIKE ? OR ref3 ILIKE ? OR notes ILIKE ?", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%").order("previous_name","current_name")
  end

# http://www.movable-type.co.uk/scripts/latlong.html#equirectangular calculating how long a segment (extent_json) is 
  def distance(lon1, lat1, lon2, lat2)
    Math.acos( Math.sin(lat1 * (Math::PI/180))*Math.sin(lat2*(Math::PI/180)) + Math.cos(lat1*Math::PI/180) * Math.cos(lat2*(Math::PI/180))*Math.cos((lon2 * Math::PI/180)-(lon1*Math::PI/180)) ) * 6371000
  end
  
  def extent_miles
    # add if to use extent_array if extend_json doesn't exist
    lineString = JSON.parse(extent_json[35..-2])  # JSON.parse converts string to array
    i = 0
    lineLength = 0
  while i < lineString.length - 1  do
      i+=1
      lineLength = lineLength + distance(lineString[i-1][0], lineString[i-1][1], lineString[i][0], lineString[i][1])
    end
    return lineLength * 0.0006214 # convert from meters to miles
  end
end
