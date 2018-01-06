#### Implementation Notes
Rails 5.1 since supposed to have better JS asset management, Ruby 2.4
https://stark-cove-20051.herokuapp.com/ | https://git.heroku.com/stark-cove-20051.git
https://github.com/MtnBiker/historical-streets-la.git

These notes can be incomplete because of things tried in branches that were abandoned. I forget to note those trials in here sometimes.
#### Moving database to Heroku—at some points Heroku will become the master
See Evernote > PostreSQL databases at bottom.

Wiped out old rails app except folder and .gitignore
Git 3- , may have forgotten to merge
rails new la_hist_street [asked if wanted to overwrite .gitignore and I said no]
Copied over stuff to Gemfile including bundler, much from crores5
bundle
bundle update
database.yml to postgis
rails db:create db:migrate
added line to config/application.rb config.active_record.schema_format = :sql. should have done it before above
rails g scaffold Street prevName:string currentName:string dateEarliest:string dateLatest:string where:string  extent:line_string numBlocks:string ref1:text ref2:text ref3:text notes:text --force since I am reusing some of this rails
yarn add jquery
<!-- yarn add bootstrap -->
yarn add bootstrap@4.0.0-alpha.6

@bootstrap-sprockets is commented out. Should I add //= require bootstrap-sprockets to application.js to make it work?
or gem 'sprockets-rails', :require => 'sprockets/railtie'


To import csv, using right click on table streets to bring up import. Changed created_at and update_at to accept null. did not import index. Couldn't change back to null!!! Fixed below
Ran these in pgAdmin (Got correct format using puts DateTime.now.httpdate and didn't sweat the GMT not being PDT -07:00; This format matched what I saw in crores5 database)
UPDATE Streets
SET updated_at = 'Sat, 27 May 2017 15:51:14 GMT';

UPDATE Streets
SET created_at = 'Sat, 27 May 2017 15:51:00 GMT';

in pgAdmin changed definition of created_at and updated_at to 'not NULL '

Index to Bootstrap 4. Use crores5 people as an example which is Bootstrap 3

#### Looking at editing in place--Failed with all of these, but would be nice to have

https://github.com/rweng/jquery-datatables-rails Datatables looks good, but couldn't make it work TODO

https://github.com/janv/rest_in_place. Simple gem ? Try this first in a git

https://github.com/infinum/phrasing Lots of pieces but may do the job

https://adityashedge.wordpress.com/2014/01/05/in-place-editable-table-with-jquery/, not clear to me how to implement. Apparently add the .js, But simple. Easiest to try

https://github.com/bootstrap-ruby/bootstrap-editable-rails Looks fairly straightforward. I think it wraps http://vitalets.github.io/x-editable/index.html  into a Rails gem
Added Procfile from crores5 to satisfy Heroku
Tried different JS edit in table and none worked. See the git forks. Comments on the last one below

Giving up on bootstrap-editable. Check git for all the ones I tried and couldn't make work.
Maybe a versioning problem with jQuery and/or Bootstrap. Demos work OK, but I try different versions and still get errors. Usually of a different type.
This one does appear to be well-supported, both in RoR and in general.


#### Implementing drawing the extent
bundle exec gem install bundler failed to stop message: "Warning: the running version of Bundler (1.13.7) is older than the version that created the lockfile (1.15.0). We suggest you upgrade to the latest version of Bundler by running `gem install bundler`."

jquery-3.2.1.min.js in application/javascript didn't stop error "Sprockets::FileNotFound: couldn't find file 'jquery' with type 'application/javascript'" with heroku push

removed and added jquery and bootstrap alpha

leaflet-draw in place via gem which seems to be kept up to date. Drawing now working. Next get the result to Postgres

See git for progress. Drawing works and results to Postgres

**Had to do a stash because messed up a save and merge.** Pulled the pieces back into the test fork.

Added Guard, but didn't explore. Seems to give odd results. Adding items with line is working. Not very native Postgres or anything. Is stored as text.

#### Devise--this was abandoned and is in 'old' master.

Adding Devise per https://www.sitepoint.com/devise-authentication-in-depth/ and https://revs.runtime-revolution.com/working-with-facebook-using-devise-omniauth-koala-and-rails-5-cde5d032de02. Hope they don't clash too much
rails generate model User name token uid avatar (May cause problems two steps after this)
rails generate devise:install
rails generate devise User [Adds to existing user file if it exists, which in my case it does]

#### Changing master to 9-formatting
For me
git checkout 9-formatting
git merge --strategy=ours master  -m "Making 9-formatting the master"
git checkout master
git merge 9-formatting            # fast-forward master up to the merge

Got message "Your branch is ahead of 'origin/master' by 5 commits.
  (use "git push" to publish your local commits)" after git co master. And changes to this file

  Error if edit from streets. Probably in the ugly decision tree. Look at gon
#### 11-Hartl-Users
10 was short lived because edited in master and decided better just to go with new branch. 10- was in master

~~Need to remove Users from database, but migrations are somewhere else. Which is probably good, not clogging up Rails. Do it in PgAdmin.~~ Done. Right click on Users and drop.
Guess it will be easier to do Hartl step by step even though means many revisions.
Pasted Listing 5.1 (layout) container class causes problems so one is commented out, 5.2 (home), already had gem bootstrap,
File to import not found or unreadable: bootstrap-sprockets, so leaving out p189
Instead of custom.css.scss, I'm using scaffolds.scss
Listing 5.5 Didn't add gem 'bootstrap-sass but maybe I should
Listing 5.6 bootstrap-sprockets results in page loading error
5.7 CSS to scaffolds, changed to custom.scss. Not getting black band in nav menu. Missing in Bootstrap 4. Fixed in custom scss, although needs refinement
5.8 5.9 CSS for basic and Heading
thru 5-17. Partials for header and footer
rails generate controller Users new. Finished Chapter 5.
Updated gems to Hartl https://github.com/mhartl/rails_tutorial_4th_edition_gemfiles/blob/master/sample_app/Gemfile
rails generate migration add_index_to_users_email and validations
rails generate migration add_password_digest_to_users password_digest:string
User.create(name: "Greg Scarich", email: "admin-la_hist_street@web.knobby.ws",  password: "", password_confirmation: "") in console since I'm pushing the database up to Heroku
Went to Bootstrap 3 after not being able to solve header formatting problem. Using bootstrap-sass. Only changed Gemfile, nothing in manifests
Also had to go to earlier version of puma. Had upgraded following Hartl

brew install heroku Chapter 11.4 rm '/usr/local/bin/heroku' and then brew link --overwrite heroku
heroku addons:create sendgrid:starter

In pgAdmin copied and pasted activation_digest and activated_at from Example User. Still says account not activated

-- SET idle_in_transaction_session_timeout = 0; -- Causing a testing error. I think this gets reset. TODO

Done with Hartl I hope. No doubt some loose ends. Mainly have to get deployed.

Skip Chapters 13 & 14 Microposts. Although might be interesting to have a bit of a site like that.

Copied puma.rb from Hartl to mine. Original doesn't work. Look at commented out parts to see if any should be put back in. TODO

Trying again. Had Heroku problem and console showed double http, so tried again
heroku config:set  ERROR_PAGE_URL=//s3.amazonaws.com/crores_heroku/heroku_error_page.html

trying AWS for map tiles: Hill1928aws = 'http://crores.s3.amazonaws.com/1928Hills/{z}/{x}/{y}.png'. Seems to work. Will upload all and confirm

Back to  Bootstrap 4 alpha6. Get both columns in Streets > Edit and Show, but have problems with navbar. Time to solve that. Used /bootstrap-4.0.0-alpha.6/docs/examples/navbar-top-fixed/navbar-top-fixed.css as a model for _header.html.erb. Didn't bother to sort out why not working correctly before. Haven't sorted out how much is Bootstrap and how much is CSS (that I have). See also */bootstrap-4.0.0-alpha.6/docs/examples/navbars/index.html#* Notes about **containers** navbar-top-fixed is the basics the examples/navbars has dropdown which I need
Not sure about where the styling is coming from. But I do have /Users/gscar/Documents/Croatian Restaurants Project-CroRes/LA Historical Street Names/la_hist_street/node_modules/bootstrap/dist/css/bootstrap.css which may be where some of these styles are picked up. I think the Node.js installation is a remnant of some trials. Maybe I need to remove this and put in just the relevant CSS
To implement opacity slider https://gis.stackexchange.com/questions/244903/want-l-opacitycontrols-to-activate-after-selecting-an-overlaylayer
https://stackoverflow.com/questions/14103489/leaflet-layer-control-events/16562033#16562033
https://stackoverflow.com/questions/32695230/leaflet-display-geojson-data-only-when-certain-layer-is-selected/32700994#32700994
https://github.com/vogdb/Leaflet.ActiveLayers
http://leafletjs.com/reference-1.0.3.html#map-baselayerchange

rails generate migration AddJsonToStreets extent_json:json (Didn't set SRID)
rails generate migration AddCityToStreets city:string added default: "Los Angeles"

L.ActiveLayers depends on L.control.layers which has baselayers as buttons (only one) and overlayLayers as checkbox (multiple—since normally points or lines, not tile maps). Therefore to have only one overlay map, probably need to hack L.activeLayers (ActiveLayers.js—it's only 150 lines) to not have to load an overlay to begin with (I've done this) and only turn off all the overlayLayers when adding another one. And ignore the fact that it's a button—put a note on the page. Can't hack L.control.layers because it's part of the 14k lines of leaflet.js. Have a hacked version and the console.logs are a start. Need to find out how to tell hide all layers except the one of interest

https://github.com/davidjbradshaw/image-map-resizer  to allow map to grow with window. Seems to work in width only, probably because I have length contstained? TODO

Put the list of available historic overlay maps to the right of the map. Two advantages: can see which layer is currently selected and plays nicer with the opacity slider. Two disadvantage: Have controls on the map and off the map—may confuse experienced users of maps, and  have map definitions (name, url, etc.) in JavaScript and Rails. Although maybe can move all to Rails and manage there. TODO

To select radio button clicked https://stackoverflow.com/questions/596351/how-can-i-know-which-radio-button-is-selected-via-jquery Comnent with 3000+ checks

Maps not loading at Heroku. Upload goes fine and only one error TypeError: `Attempted to assign to readonly property`

~~Getting errors because leaflet-rails isn't using latest version (1.1 vs. 1.2), but when I switched caused other problems (I probably didn't put in the reference in the right file.); but decided to wait for a while and see if the gem gets fixed. NOTE: moot, see below for Leaflet~~ 

big_map changed to (streets) overview. Map is the list of background maps. Overview  shows all the streets. Made to change to avoid potential confusion in testing, map meant two things. This got rid of a test error!

json now working for overview. Call to create seems to be when mapbox/leaflet asks for overview_data.json. But routes and controller has to be setup correctly too.

Got rid of Leaflet explicitly (no leaflet-rails, not in application.js/.scss), Leaflet is included in mapbox and since I'm using some Mapbox. Having both was causing some conflicts. Mapbox is added in application.html.erb. mapbox-rails is not being kept up to date.

Saving `extent` as json. extent_array started causing errors and json is probably going to be easier to work with in the long run. var geojson = layer.toGeoJSON(); … JSON.stringify(geojson.geometry).

extent.json is GeoJSON LineString. I could make a Feature and store other information, but for now just keeping it separately in the dB seems fine. Just have to deal with how JavaScript (Leaflet specifically) handles GeoJSON (I'm not using any PostGIS aspects nor Rails. )

Editing is now GeoJSON stored in extent_json. Legacy extent_array still there until copy those to GeoJSON (edit and trace.)

https://gis.stackexchange.com/questions/166863/how-to-calculate-the-bounding-box-of-a-geojson-object-using-python-or-javascript to get fitBounds to work. Using another function

(Paper Trail )[https://github.com/airblade/paper_trail] including **undo** http://railscasts.com/episodes/255-undo-with-paper-trail and product.versions.reload (I think the passing true to the scope/relation is getting phased out in favor of reload, which I think is better), from the comments. Also namespacing:  @version =  PaperTrail::Version.find(params[:id]) in version.controller

Two things needed. Color of lines. fitBounds for overview; although this is less critical as map gets filled up

Trying to debug `Uncaught Error: Map container is already initialized.`  when moving away from edit or show streets, etc.

Trying to add feature that map will zoom to max level instead of showing a blank. And keep zoom level if adequate. Also when select a new base map, the overlay maps become hidden. 
 The radio button input and also a value="https://api.mapbox…" etc, ie my map
 - Looking through streets.js. Need to take stuff out of showMap that doesn't happen until overlay maps are added

jQuery UI needed by Leaflet.OpacityControls (slider)

**JavaScript program flow.intaglio** to see how the parts fit together

change-camelcase-column-names to underscore so search would work. Some fixes worked but not all. Wasn't that bad.