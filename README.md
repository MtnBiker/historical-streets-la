# README
A compilation of the history of the street name changes in Los Angeles.

And showing those changed segments of the streets on a map.

Intially to support [Croatian Run Restaurants in Los Angeles 1880&ndash;1930](https://secure-shore-68966.herokuapp.com),
but then saw a general need and was able to leverage the extensive list published by Steve Morse: [Los Angeles in the 1900s&mdash;Streets of a Hundred Years Ago](http://stevemorse.org/census/changes/LosAngelesChanges2.htm)." [Morse's site](http://stevemorse.org/) is a treasure trove of historical and geneological information. Almost all of the information is from this resource. I've added the ability to put that information on a map and have started to do that for some of the 500 or so entries. After launching the site, anyone will be able to add or edit the entries.

For more information for now check out the about page at [Croatian Run Restaurants in Los Angeles  1880&ndash;1930](https://stark-cove-20051.herokuapp.com/about) which uses many of the same resources. Also its [acknowledgements page](https://stark-cove-20051.herokuapp.com/about).

### Status—pre-release
- The database will be refreshed, in other words, you can make changes and create accounts, but they will disappear. Be patient. But please let me know if you have any comments or suggestions.

- Basic feature set implemented and working on my computer. √

- [Beta deployment](https://stark-cove-20051.herokuapp.com/). √

- Now that it's deployed, some issues need to be addressed before opening it up.
    * If zoomed in beyond what's available, no indication of what's going on.

### Bigger plans
- Downloads page to download all data

- Indicate that no coverage is available in the field of view when click on a layer.

- A slider to view those segments over time

- Search. Could then add pagination

- More historical maps. Particularly Sanborn

#### Nice to haves
  * Button text formatting
  * Can localhost and Heroku databases be synced? Nice if I could work on localhost.
  * Add attribution and dates to changes (history of changes)

### Technical&mdash;links on [acknowledgements page](https://stark-cove-20051.herokuapp.com/about)
Ruby on Rails 5.1.

PostgreSQL (PostGIS) database.

Leaflet.js and Mapbox.js for mapping.

Offline QGIS for georeferencing maps.

Deployed at Heroku.

Map tiles served from AWS.
