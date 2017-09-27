# Copied from CroRes, so some of it may be left over from that

# Trying to get segments to show on map if they exist

json.type "FeatureCollection" # if street.extent_array

json.features @segments do |street|
  if (street.extent_array) # only if item has a line drawn
    json.type "Feature"
    json.geometry do
     # Only want an entry if coordinates exist for location. Should log missing results
       json.type "LineString"
       json.coordinates street.extent_array # adds quotes arround extent_array which mapbox doesn't like or maybe it's something else mapbox doesn't like TODO
    end # json.geometry

    json.properties do
       json.prevName street.prevName
       json.dateEarliest street.dateEarliest
       json.currentName street.currentName
       json.dateLatest street.dateLatest
       # Below and above can't both be correct. TODO
       json.title "Was #{street.prevName} before #{street['dateEarliest']} and now is #{street['currentName']} (#{street['dateLatest']})"
    end

  end  # if
end # json.features

