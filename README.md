# GitHub README—Historic Street Names in Los Angeles
A compilation of the history of the street name changes in Los Angeles.

And showing those changed segments of the streets on a map.

The site is [Historic Street Names in Los Angeles](https://la-hist-streets.fly.dev/).

Initially to support [Croatian Run Restaurants in Los Angeles 1880&ndash;1930](https://croatian-restaurants-la.fly.dev/),
but then saw a general need and was able to leverage the extensive list published by Steve Morse: [Los Angeles in the 1900s&mdash;Streets of a Hundred Years Ago](http://stevemorse.org/census/changes/LosAngelesChanges2.htm). [Morse's site](http://stevemorse.org/) is a treasure trove of historical and genealogical information. Almost all of the information is from this resource. I've added the ability to put that information on a map and have started to do that for some of the 500 or so entries. After launching the site, anyone will be able to add or edit the entries.

For more information for now check out the about page at [Croatian Run Restaurants in Los Angeles  1880&ndash;1930](hhttps://croatian-restaurants-la.fly.dev/about) which uses many of the same resources. Also its [acknowledgements page](https://croatian-restaurants-la.fly.dev/acknowledgements).

### Status—Deployed

- And the database is running from there, instead of locally as it was during development.

- [la-hist-streets.fly.dev](https://la-hist-streets.fly.dev/)  is up and running. 

### Bigger plans
- Only if some interest is shown

- Downloads page to download all data

- Indicate that no coverage is available in the field of view when click on a layer.

- More historical maps. Particularly Sanborn

- Historical street photos or links to them

### Technical
- Ruby on Rails 7.0, Ruby 3.1.2

- PostgreSQL database.
 
- Leaflet.js and Mapbox.js for mapping.
 
- QGIS for georeferencing maps.
 
- Deployed at [Fly.io](https://fly.io/).
 
- Map tiles served from AWS.

[More details on the site](https://la-hist-streets.fly.dev/acknowledgements).
