# README
A  compilation of the history of the street name changes in Los Angeles. 

And showing those changed segments  of the streets on a map.

Intially to support [Croatian Run Restaurants in Los Angeles 1880&ndash;1930](https://secure-shore-68966.herokuapp.com),
but then saw a general need and was able to leverage the extensive list published by Steve Morse: [Los Angeles in the 1900s&mdash;Streets of a Hundred Years Ago](http://stevemorse.org/census/changes/LosAngelesChanges2.htm)." [Morse's site](http://stevemorse.org/) is a treasure trove of historical and geneological information. Almost all of the information is from this resource. I've added the ability to put that information on a map and have started to do that for some of the 500 or so entries. After launching the site, anyone will be able to add or edit the entries.

For more information for now check out the about page at [Croatian Run Restaurants in Los Angeles  1880&ndash;1930](https://stark-cove-20051.herokuapp.com/about) which uses many of the same resources. Also its [acknowledgements page](https://stark-cove-20051.herokuapp.com/about).

### Status—pre-release

- Basic feature set implemented and working on my computer. √

- [Beta deployment](https://stark-cove-20051.herokuapp.com/). √

- Now that it's deployed, a few details need to be resolved. 

- At first glance an important problem is that maptiles can't be served from my domain. Error message: Failed to load resource: net::ERR_SSL_PROTOCOL_ERROR

- The database will be refreshed, in other words, you can make changes and create accounts, but they will disappear. Be patient. But please let me know if you have any comments or suggestions.

- Then decide if I can work on localhost and sync changes to Heroku or everything needs to be on Heroku.
 
- Confirm that the geographic information storage of the segments is a good choice. It's currently a LINESTRING array stored as a string. 

- Acknowledgements page TBD.

### Bigger plans
- Planned after initial deployment is an overview map showing all the changed streets. 

- A slider to view those segments over time

- More historical maps. Particularly Sanborn

### Technical
Ruby on Rails 5.1. PostgreSQL database. Mainly Leaflet.js for maps. Offline QGIS for georeferening maps. Deployed at Heroku. Historic maps mostly served from my domain (not a long term solution). Will expand in Acknowledgements page.
 