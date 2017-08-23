# json.array! @streets, partial: 'streets/street', as: :street

# Copied from CroRes, so some of it may be left over from that

# Trying to get segments to show on map if they exist
json.type "FeatureCollection"
json.features @streets do |street|
  if (street.extent_array)
    json.type "Feature"
    json.geometry do
     # Only want an entry if coordinates exist for location. Should log missing results
       json.type "LineString"
       json.coordinates street.extent_array
    end # json.geomtry extent…

    json.properties do
       json.date street.date_earliest
       json.date street.dateLatest
       # json.title street.popup # a method in resto_resid_line.rb
    end

  end  # if
end # features street;