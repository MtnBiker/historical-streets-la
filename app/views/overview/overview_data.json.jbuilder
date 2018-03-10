json.type "FeatureCollection"

json.features @segments do |street|
  puts street.extent_json
  if (street.extent_json.to_s != "") # only if item has a line drawn. 
    link = street.id
    extent = JSON.parse(street.extent_json) # extent is a hash parsed from a string

    json.type "Feature"

    json.properties do
      # Adding what's needed for skeate/Leaflet.timeline
      json.start street.date_earliest
      json.end   street.date_latest
      json.name  street.current_name # maybe this should be something else, but is used by sample
      
       # title is for popup/rollover
       json.title h("Was #{street.previous_name} before #{street.date_earliest} and now is #{street.current_name} #{street.date_latest}.")
       # This breaks it, but fixable.
       # json.link = h(<a href=\"street/#{link}\">link</a>)  # if add this to above it comes across as is without the \, but no real link
       json.link = street.id # to use to make link in .js. not sure where, see link above TODO
    end # do

    json.geometry do
       json.type "LineString"
       json.coordinates extent["coordinates"]
    end # json.geometry

  end  # if
end # json.features
