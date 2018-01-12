* 1928 Hill's needs more detailed georeferencing
 
* 1902 Rueger needs trimming. Unfortunately probably have to georef again.

* Date slider on overview map. Even better if overview maps synced by date.

* Section 5.3.4 testing mostly not working
  
* Option to paginate. Gems are installed. Two places change. streets/users_controller.rb lines 7/8 and two erbs for pagination on streets/index.html.erb
 
* Get rid of example user when I get myself set up on localhost
 
* Make the signup and password reset emails and HTML a bit more professional

* A page to view paper_trail. Probably looks like other index list pages. Static or view of its own?
 
* Look at puma.rb and see if hidden stuff is needed
 
* Login should take you back to the page you were on
 
* Put up a notice if no coverage available for the map selected.
* Some if not all maps give errors for tiles that don't exist. E.g., 1909gates/13/1406/… at least when load outside its range
 
* The overlay maps selection column needs to have radio button next to text. At least now scrunched enough can tell. But need to get into Bootstrap 4 more. 

* Scan and OCR street information in City Directories. The Los Angeles City Directories had a section that listed street names and their extent (beginning and end.) Add this to site as searchable. Scan any maps too. The scans may be available where the directories are, e.g., LAPL, Ancestry

* Edit OCR Baist index. Saved as text file with the maps

* Link in popup on overview to streets>show
https://gis.stackexchange.com/questions/229723/how-to-display-properties-of-geojson-in-popup-on-leaflet
https://gis.stackexchange.com/questions/111410/display-a-link-in-a-popup-with-leaflet

* Color of lines on overview map. L.mapbox.featureLayer doesn't have color option. Can it be added to json? If not need a whole new approach. Adding polylines in Leaflet. Has path options which includes color. Probably need to do this if going to change colors by year. And PolyLine is lat-lng not lng-lat like GeoJSON. No key on lat or lon, so would have to parse. Maybe need to go back to drawing with lat-lng polylines

* Add other Baist detail maps to existing served set?

* Is jQuery UI being used? If so remove unused effects and widgets

* Notices appear twice. Note that in Map>show after an edit, one of the notices is borked, so only get rid of that one

* Add a column/field for segment length, and calculate when created. More info than blocks.

* Make column titles sticky

* Buttons One is solid on edit, but using same class on show doesn't work: btn btn-primary. Text isn't white

* Existing segment doesn't show up when go to edit. Should show up as different color or make it editable, but don't want it going away if the segment is not edited

