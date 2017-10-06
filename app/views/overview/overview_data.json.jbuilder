json.type "FeatureCollection"

json.features @segments do |street|
  puts street.extent_json
  # binding.pry
  if (street.extent_json.to_s != "") # only if item has a line drawn
    link = street.id
    extent = JSON.parse(street.extent_json) # extent is a hash parsed from a string
    # binding.pry

    json.type "Feature"

    json.properties do
       # title is for popup/rollover
       json.title h("Was #{street.prevName} before #{street.dateEarliest} and now is #{street.currentName} #{street.dateLatest}.")
       # This breaks it, but fixable.
       # json.link = h(<a href=\"street/#{link}\">link</a>)
    end # do

    json.geometry do
       json.type "LineString"
       json.coordinates extent["coordinates"]
    end # json.geometry

  end  # if
end # json.features
