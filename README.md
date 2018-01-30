# README
A compilation of the history of the street name changes in Los Angeles.

And showing those changed segments of the streets on a map.

 The site is [Historic Street Names in Los Angeles](https://historicstreets.la/).

Initially to support [Croatian Run Restaurants in Los Angeles 1880&ndash;1930](https://secure-shore-68966.herokuapp.com),
but then saw a general need and was able to leverage the extensive list published by Steve Morse: [Los Angeles in the 1900s&mdash;Streets of a Hundred Years Ago](http://stevemorse.org/census/changes/LosAngelesChanges2.htm)." [Morse's site](http://stevemorse.org/) is a treasure trove of historical and genealogical information. Almost all of the information is from this resource. I've added the ability to put that information on a map and have started to do that for some of the 500 or so entries. After launching the site, anyone will be able to add or edit the entries.

For more information for now check out the about page at [Croatian Run Restaurants in Los Angeles  1880&ndash;1930](https://secure-shore-68966.herokuapp.com/about) which uses many of the same resources. Also its [acknowledgements page](https://historicstreets.la/about).

### Status—beta

- [The site](https://historicstreets.la/). Or maybe it's v1 with more versions to follow.

### Bigger plans
- Downloads page to download all data

- Indicate that no coverage is available in the field of view when click on a layer.

- A slider to view those segments over time

- More historical maps. Particularly Sanborn

- Historical street photos or links to them


### Technical&mdash;links on [acknowledgements page](https://stark-cove-20051.herokuapp.com/about)
Ruby on Rails 5.1.

PostgreSQL (PostGIS) database.

Leaflet.js and Mapbox.js for mapping.

Offline QGIS for georeferencing maps.

Deployed at Heroku.

Map tiles served from AWS.
