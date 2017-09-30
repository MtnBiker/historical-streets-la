# Copied from CroRes, so some of it may be left over from that

# Trying to get segments to show on map if they exist

json.type "FeatureCollection" # if street.json_array

json.features @segments do |street|
  if (street.extent_json) # only if item has a line drawn
    json.type "Feature"
    json.geometry do
     # Only want an entry if coordinates exist for location. Should log missing results
       json.type "LineString"
       json.coordinates street.extent_json # adding backslash on type and coordinates for some listings TODO
    end # json.geometry

    json.properties do
      # Not using these at the moment, so commenting out.
       # json.prevName street.prevName
       # json.dateEarliest street.dateEarliest
       # json.currentName street.currentName
       # json.dateLatest street.dateLatest
       # Below and above can't both be correct. TODO Not even using title, getting info with popUp
       json.title "Was #{street.prevName} before #{street['dateEarliest']} and now is #{street['currentName']} (#{street['dateLatest']})"
    end

  end  # if
end # json.features

