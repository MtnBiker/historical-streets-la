json.type "FeatureCollection"

json.features @segments do |street|
if (street.extent_json) # only if item has a line drawn
    link = street.id
    extent = JSON.parse(street.extent_json)
    # extent = extent.to_s
    # extent = extent.gsub(':{\"coordinates\":{\"type\":\"LineString\",\"coordinates\")', '')
    # extent [":{\"coordinates\":{\"type\":\"LineString\",\"coordinates\")"] = ""

    json.type "Feature"

    json.properties do
      # Not using these at the moment, so commenting out.
       # json.prevName street.prevName
       # json.dateEarliest street.dateEarliest
       # json.currentName street.currentName
       # json.dateLatest street.dateLatest
       # Below and above can't both be correct. TODO Not even using title, getting info with popUp
       json.title h("Was #{street.prevName} before #{street.dateEarliest} and now is #{street.currentName} #{street.dateLatest}.")
       # This breaks it, but fixable.
       # json.link = h(<a href=\"street/#{link}\">link</a>)
    end

    json.geometry do
     # Only want an entry if coordinates exist for location. Should log missing results
       # json.type "LineString"
       # json.coordinates extent # adding backslash on type and coordinates for some listings TODO
       json.type "LineString"
       json.coordinates extent["coordinates"]
       # json.array! @street, :id, :name
    end # json.geometry

  end  # if
end # json.features

