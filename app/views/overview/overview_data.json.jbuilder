# json.array! @streets, partial: 'streets/street', as: :street

# Copied from CroRes, so some of it may be left over from that

# Trying to get segments to show on map if they exist
console.log("Reporting from overview.json.jbuilder");
json.type "FeatureCollection" # if street.extent_array

json.features @segments do |street|
  # if (street.extent_array)
    json.type "Feature"
    json.geometry do
     # Only want an entry if coordinates exist for location. Should log missing results
       json.type "LineString"
       json.coordinates street.extent_array
    end # json.geometry

    json.properties do
       json.text street.prevName
       json.text street.dateEarliest
       json.text street.currentName
       json.text street.dateLatest
       # Below and above can't both be correct. TODO
       json.title "Was #{street.prevName} before #{street.dateEarliest} and now is #{street['currentName']} (#{street['dateLatest']})"
    end

  # end  # if
end # json.features


# TODO add back in the requirement fo street.extent_array to exist. Took out for debugging
