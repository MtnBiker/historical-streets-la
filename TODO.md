### To Be Done
* Can't drawn in edit/new streets
* Move to better asset management (no webpacker)
* Add links to photos on an overview map. Indicate with an arrow pointing in the view direction. Have photo pop up on rollover or have it go to a page that shows the photo and the map with what is being seen on both (have to work out what this means)
* Stimulus for putting linked document once select.

* Color lines on main map to show which end is resid vs. resto

* Fix links to AWS following crores
* Sort out requires and importing for leaflet mapbox
* Rollover/popup not working on main map. Do I need popper and have I installed it right. One bootstrap reference said it's included in bootstrap? Apparently need popper.js (not popper which is different)

* Add Ruxton

* Mapbox is currently added in application.html.erb. Another way? See crores

* Create images table: url (of the image), thumb_url, source_name, refer_url (where heard about it), title, description, date. has_and_belongs_to_many similar to maps. How add images? From street > new/update. What does streets>index and streets>show? Thumbnail with link?

* Main St numbering change

* Add search icon to Search for street textarea and remove Submit Search. Remove duplicate search, i.e, in menu bar when on streets pages, maybe 

* Fix overview so popups work without the added click to show all segments

* Length of segment. Easier to comprehend if units were feet (or meters) up to a quarter of a mile or so, then miles. 0.054 miles is hard to comprehend. Currently truncation is done in streets/index. That would have to move to the model since units (ie feet or miles) would be added there. Change name from extent_miles to extent_length or something. Not part of database, so not too hard to change.

* The overlay maps selection column needs to have radio button next to text. At least now scrunched enough can tell. But need to get into Bootstrap 4 more. Don't understand why button isn't on same line. Look at the Leaflet overlay to see how the formatting is done.

* Formatting of Log in page: /sessions/new.html.erb

* Add boolean column to Maps as to whether to include in the map views, in other words, some maps may have a reference but not used in map views. Add the logic to the streets.js and overviewmapSelector to not show those maps. 

* 1928 Hill's needs more detailed georeferencing. 1894 Sanborn could be refined at S corner straight up to Commercial. Eastern side is OK
 
* 1902 Rueger needs trimming. Unfortunately probably have to georef again. Maybe not really a problem.

* Section 5.3.4 testing mostly not working

* Make column titles sticky. Not so important with pagination
 
* Make the signup and password reset emails and HTML a bit more professional

* A page to view paper_trail. Probably looks like other index list pages. Static or view of its own?
* Track who's made a change. 
  
* Login should take you back to the page you were on
 
* Put up a notice if no coverage available for the map selected.
* Some if not all maps give errors for tiles that don't exist. E.g., 1909gates/13/1406/… at least when load outside its range
 
* Scan and OCR street information in City Directories. The Los Angeles City Directories had a section that listed street names and their extent (beginning and end.) Add this to site as searchable. Scan any maps too. The scans may be available where the directories are, e.g., LAPL, Ancestry

* Edit OCR Baist index. Saved as text file with the maps

* Link in popup on overview to streets>show
https://gis.stackexchange.com/questions/229723/how-to-display-properties-of-geojson-in-popup-on-leaflet
https://gis.stackexchange.com/questions/111410/display-a-link-in-a-popup-with-leaflet

* Add other Baist detail maps to existing served set.

* Remove unused effects and widgets from jQuery. Leaflet.OpacityControls uses jQuery.

* Notices appear twice. Note that in Map>show after an edit, one of the notices is borked, so only get rid of that one

* Buttons One is solid on edit, but using same class on show doesn't work: btn btn-primary. Text isn't white

* Edit listing on left is a bit scrunched. Happened when I messed with the overlay map list

* Duplicate a street item. Since often have similar info that don't want to reenter. Would take you to new with the info—partially done?

* Existing segment doesn't show up when go to edit. Should show up as different color or make it editable, but don't want it going away if the segment is not edited. Fixed this, but now not working again.

* extent_length could be removed. Is a legacy item, but is still created in edit. streets.js would have to eliminate creating this and edit not show it (change to dynamically creating?)

### Completed

* Street length should be dynamically created.  Still is stored when drawn, but that value not used except in edit window when line is drawn. 2018.03.05

* Table of references and a way to select them in Create/New and have them all list

* Search would be better in navbar since it's sticky and there is room or it. For now should be called "Search streets" unless add site-wide search

* Date slider on overview map. Even better if overview maps synced by date? Color by date. 2018.03.19
* Color of lines on overview map. L.mapbox.featureLayer doesn't have color option. Can it be added to json? If not need a whole new approach. Adding polylines in Leaflet. Has path options which includes color. Probably need to do this if going to change colors by year. And PolyLine is lat-lng not lng-lat like GeoJSON. No key on lat or lon, so would have to parse. Maybe need to go back to drawing with lat-lng polylines

* Column sorting 2018.03.22 which included.   Option to paginate came along for the ride.

* For admin only: add email address to users>show. Helpful for testing accounts I set up and of others join in. 2018.03.26

* Get rid of example user when I get myself set up on localhost. Also track who made the change. Create admin user at historicstreets.la 2018.03.25

* * ≤ ≥ are backwards on streets>show 2020.06.13

* Move to Rails 7 and Ruby 3 2022.09.09

