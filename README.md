# README
A  compilation of the history of the street name changes in Los Angeles. 

And showing those changed segments  of the streets on a map.

Intially to support [Croatian Run Restaurants in Los Angeles 1880&ndash;1930](https://secure-shore-68966.herokuapp.com),
but then saw a general need and was able to leverage the extensive list published by Steve Morse: [Los Angeles in the 1900s&mdash;Streets of a Hundred Years Ago](http://stevemorse.org/census/changes/LosAngelesChanges2.htm)." [Morse's site](http://stevemorse.org/) is a treasure trove of historical and geneological information. Almost all of the information is from this resource. I've added the ability to put that information on a map and have started to do that for some of the 500 or so entries. After launching the site, anyone will be able to add or edit the entries.

For more information for now check out the about page at [Croatian Run Restaurants in Los Angeles  1880&ndash;1930](https://stark-cove-20051.herokuapp.com/about) which uses many of the same resources. Also its [acknowledgements page](https://stark-cove-20051.herokuapp.com/about).

### Status—pre-release
- The database will be refreshed, in other words, you can make changes and create accounts, but they will disappear. Be patient. But please let me know if you have any comments or suggestions.

- Basic feature set implemented and working on my computer. √

- [Beta deployment](https://stark-cove-20051.herokuapp.com/). √

- Now that it's deployed, a few problems have to be fixed: 

- Trying to add 18 level tiles when they don't exist and getting errors

- Bing map loading causing some errors

- Confirm that the geographic information storage of the segments is a good choice. It's currently a LINESTRING array stored as a string. 

- Button text formatting

- Mobile: dropdown menu not working

- Can localhost and Heroku databases be synced? Nice if I could work on localhost.
 
- Acknowledgements page TBD, linked to [acknowledgements at Croatian Run Restaurants in Los Angeles 1880&ndash;1930](https://secure-shore-68966.herokuapp.com) and notes on home page cover the basics

### Bigger plans
- An overview map showing all the changed streets. 

- Indicate that no coverage is available in the field of view when click on a layer.

- A slider to view those segments over time

- Search. Could then add pagination 

- More historical maps. Particularly Sanborn

#### Nice to haves
- Transparency slider 

### Technical
Ruby on Rails 5.1. PostgreSQL database. Mainly Leaflet.js for mapping. Offline QGIS for georeferening maps. Deployed at Heroku. Will expand in Acknowledgements page. Map tiles served from AWS.
 