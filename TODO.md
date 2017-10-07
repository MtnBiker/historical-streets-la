* Add a field so we know who edited the item. Check that this works

* Add search for street and return to map at center of the segment

* 1928 Hill's needs more detailed georeferencing
 
* 1902 Rueger needs trimming. Unfortunately probably have to georef again.

* Date slider on overview map. Even better if overview maps synced by date.

* Overlay maps don't display when clicked on if not in zoom range.

* Section 5.3.4 testing mostly not working
 
* Link colors have problems. Changed to teal, but that doesn't work with blue background buttons
 
* Option to paginate. Gems are installed. Two places change. streets/users_controller.rb lines 7/8 and two erbs for pagination on streets/index.html.erb
 
* Get rid of example user when I get myself set up on localhost
 
* Make the signup and password reset emails and HTML a bit more professional

* A page to view paper_trail. Probably looks like other index list pages. Static or view of its own?
 
* Look at puma.rb and see if hidden stuff is needed
 
* Login should take you back to the page you were on
 
* Add attribution to changes

* Put up a notice if no coverage available for the map selected.
 
* The overlay maps selection column needs to have radio button next to text. At least now scrunched enough can tell. But need to get into Bootstrap 4 more. Maybe with next version I'll did into it.

* Scan and OCR street information in City Directories. The Los Angeles City Directories had a section that listed street names and their extent (beginning and end.) Add this to site as searchable. Scan any maps too. The scans may be available where the directories are, e.g., LAPL, Ancestry

* Edit OCR Baist index. Saved as text file with the maps

* Look at later for popup
https://gis.stackexchange.com/questions/229723/how-to-display-properties-of-geojson-in-popup-on-leaflet
https://gis.stackexchange.com/questions/111410/display-a-link-in-a-popup-with-leaflet

* Color of lines on overview map.

* Add other Baist detail maps to existing served set