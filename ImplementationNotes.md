#### Implementation Notes
Took this file out of git control , i.e., in .gitignore so can see abandoned fork notes

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

extent.json is ~~GeoJSON~~ JSON as far as Postgres is concerned. It's a LineString by construction. I could make a Feature and store other information, but for now just keeping it separately in the dB seems fine. Just have to deal with how JavaScript (Leaflet specifically) handles GeoJSON (I'm not using any PostGIS aspects nor Rails. )

Editing is now GeoJSON stored in extent_json. Legacy extent_array still there until copy those to GeoJSON (edit and trace.). 

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

To get search icon: gem "font-awesome-rails" @import "font-awesome"; <i class="fa fa-search"></i> , but can also use <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">. Although not the Rails way, is simpler. Still don't have icon inside the search text box.

Turbolinks and Leaflet don't get along. The most extreme was getting map related errors on pages without maps. data: {turbolinks: false} in link_to's going to or from map related pages. Maybe better to just remove turbolinks since navbar links can be used from any page. And individual pages can be set to not honor turbolinks (See docs). Decided I probably don't need turbolinks. Easier to just not use turbolinks than be chasing different fixes. 2018.01.12

Displaying no. of significant figures for distance
http://api.rubyonrails.org/classes/ActiveSupport/NumberHelper.html#method-i-number_to_rounded
number_to_rounded(number, precision: 1, significant: true)
But how get a value from the table into  number as a variable
<%= @street.extent_length.round(2) %> but maybe will always show 2 significant figures?

XX Did this in another branch, but I abandoned this idea. I wanted to just get the two turf pieces I needed, but too complicated. Later 
Turf.js and webpacker/yarn: `yarn add @turf/helpers `and `yarn add @turf/length`. Probably could have chained, but first time with an outside jS file. Need to do more. Guess I need the webpacker part. `gem 'webpacker', '~> 3.0'` and  `rails webpacker:install`   and `rails webpacker:install:erb` hoping to get back erb in streets>show. didn't help. Maybe too much trouble just to avoid one turf.js large file. The idea is to only install the needed pieces.
The following shows the steps needed. Can't believe that a simpler approach won't be worked out.
https://clarkdave.net/2015/01/how-to-use-webpack-with-rails/. This is two years old.

gem "bootstrap_form"__, https://github.com/bootstrap-ruby/bootstrap_form Doubled up field titles on so left off (because was using :field for text, if hard code no problem). Not sure of the importance of using this. Only used in street>edit and map>edit. REMOVED AS I DIDN'T SEE THE ADVANTAGES (DIDN'T TRY TOO HARD) AND WOULD HAVE had to figure out how to get rid of the duplicate titles, I needed to hard code the titles, so I was getting the hard coded version and one created from the field name (which either was awkward, eg. Url, or not descriptive enough )

2018.03.19  Commit hasn't worked for a while. Since Webpacker or before, but hadn't realized it. Removed a lot of package.json and everything related to Webpacker per Sam Ruby, Copeland p 197
Leaflet.Timeline working to some extent. Hack to get width of control right and popups not working YET.
As a kluge, have a link to put all lines on the map that have the popups

2018.03.22 Added datatables to get sorting and pagination. Removed gems installed for pagination from Hartl. https://datatables.net/manual/options

2020.06.06 I had moved the database to Heroku (now the master); but I want a local copy for a presentation, so should download it. May lead to confusion on my part.
Also updated to ruby-2.7.0 to get past the Bundler not installed. Still at `gem 'rails', '~> 5.1.4'``
2020.06.09 Push failed with `This repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/post-checkout.` so renamed file. Fixed git push. But `git push heroku` failed.
Also a note on checking into out this branch: `This repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/post-checkout.` Renamed that file but to what other effects?
`brew upgrade yarn` as got errors about needing. Except got this message `Warning: yarn 1.22.4 already installed`


Ruby Sass has reached end-of-life and should no longer be used
NEWER VERSION AVAILABLE: Please upgrade to AWS SDK For Ruby V3

` Ruby Sass has reached end-of-life and should no longer be used.
remote:        * If you use Sass as a plug-in for a Ruby web framework, we recommend using the
remote:          sassc gem: https://github.com/sass/sassc-ruby#readme`
I don't directly require it. Bootstrap4 seems to, but that's fairly recent. Maybe a bundle will fix. Still there. `bundle update`? Tried `bundle update bootstrap`. No change, so changed Gemfile to v4 instead of v4.0.0 Bootstrap is up to 4.5. `sass` is now gone, replaced with sassc?

`bundle update puma` because of a note from GitHub (first time I got one of these)

gem install ffi -v '1.13.1' --source 'https://rubygems.org/' since got bundle error

Answer I got later: https://stackoverflow.com/questions/62368342/rails-bundle-cant-install-gem-ffi/64083281#64083281

`gem install ffi -v '1.12.1' --source 'https://rubygems.org/'` since this version was in crores. Also change Gemfile.lock. Didn't help. 

Bootstrap needs ffi, but turn this off for a build. Guard & Listen same thing. Now successful bundle. Put bootstrap back in. Didn't help
`ruby-install ruby-2.7.0`again `bundle install` still failed
`bundle update --all` failed with same error
Relaunched iTerm
`sudo xcodebuild -license`  no help

Tried changing back to ruby 2.6.6 and ruby 2.6.1 but then got into nokogiri install problems
Back to 2.7.0 but then ffi problems
`ruby-install ruby 2.7.0 ` which seems to do a complete reinstall. since some of the errors mentioned ruby, but then it's ruby that's running
  # config.file_watcher = ActiveSupport::EventedFileUpdateChecker #FIXME? turned off to since maybe an error related to know having in development.rb allowed `rs` to work, but don't have bootstrap yet. But with Bootstrap back in get ffi error
  
bundle update without gem bootstrap, but then have page loading failures with popper, then sassc. This won't work in the long run since I'm using Bootstrap. 

### Do I bit the bullet and move to Rails 6 and webpacker and fight all of that. Maybe since I did it not too long ago in crores5
gem update --system
bundle update # good after one gem change
rails app:update
- and copied over stuff that would have been wiped
bin/rails webpacker:install => LoadError: Could not load the 'listen' gem. Add `gem 'listen'` to the development group of your Gemfile
but then bundle install fails # An error occurred while installing ffi (1.13.1), and Bundler cannot continue.
back where I started from. Rails 6 didn't help
Removed some gems that seemed to be an issue. 
yarn upgrade # I made some changes to package.json
brew upgrade yarn => yarn 1.22.4 already installed
yarn install --check-files => success Nothing to install.
➜ bin/rails webpacker:install
LoadError: Could not load the 'listen' gem. Add `gem 'listen'` to the development group of your Gemfile
Do that, then `bundle` and follow the install, but same error when `bundle` again
An error occurred while installing ffi (1.13.1), and Bundler cannot continue.
Make sure that `gem install ffi -v '1.13.1' --source 'https://rubygems.org/'` succeeds before bundling.
Maybe give up for now on Rails 6 and go back and figure out when last uploaded to Heroku
Last successfull upload: Deployed ba95057f May 30, 2018 at 1:54 PM · v82, Build succeeded
May 30, 2018 at 1:54 PM 

Set Gemfile to match that date. Based on Comparing Revisions (Couldn't figure out SourceTree)
Labeled changes with  FIXME-2020.06.16. Couldn't `bundle`, changed to `bundle update`
=> An error occurred while installing ffi (1.13.1), and Bundler cannot continue.
Make sure that `gem install ffi -v '1.13.1' --source 'https://rubygems.org/'` succeeds before bundling.
Still can't bundle update after following install ff1

Try just going back to the May 30, 2018 at 1:54 PM  and make any needed changes
>>>>>>> External Changes
2020.06.20 Went back to May 30, 2018. Checked out via Sourcetree as 58-… but still couldn't bundle. Same ffi error
ImplementationNotes still being tracked. Changed to  '/ImplementationNotes.md'
Give up for now.
Add bootstrap via Webpacker which means a full Webpacker install.
`brew upgrade yarn`
`rails webpacker:install` Fails Rails doesn't know
`gem install rails` webpacker install still fails
Problem with something in development.rb -
And had to change LA_Historical_Street_Names without blanks and similarly for folder above  and `yarn upgrade` succeeds. Git may have gotten confused too. Changed back to avoid git problems
`yarn upgrade`
`yarn add bootstrap`
`yarn add jquery`
`yarn add jqueryui popper tether`
`yarn add leaflet`
`yarn add @rails/ujs`
`yarn add turbolinks`
Lots of changes to /javascripts/packs/application.js
Appears bootstrap isn't working.
`yarn add core-js regenerator-runtime` Didn't help with jS error

Following per https://github.com/tootsuite/mastodon/issues/10092
`yarn upgrade-interactive --latest`
`rm yarn.lock`
`rm -rf node_modules`
`yarn install`
Same error: bootstrap:83 Uncaught Error: Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: Cannot find module 'babel-plugin-syntax-dynamic-import' from '/Users/gscar/Documents/Croatian Restaurants Project-CroRes/LA Historical Street Names/la_hist_street'
- Did you mean "@babel/syntax-dynamic-import"?
`yarn add @babel/plugin-syntax-dynamic-import --dev` didn't help. BTW it was already installed
`yarn remove tether` not sure was using and what the heck. No difference
`@rails/activestorage` Seems like I should have this. Little harm if don't. Can remove later 
➜ yarn add popper.js
yarn add v1.22.4 # because got unmet dependency
`yarn add @babel/core` because of unmet etc. but said already had

Tried commenting out all test and dev gems. server didn't work. 
Commented out all test and server worked, but same error
Commented out gem turbolinks since now with Webpack, but still get babel error
Added active storage
yarn add @fortawesome/fontawesome-free and turned off gem
Switched to Ruby 2.7.1 because why not. How much worse can it get
Webpacker to v5 was v4. no help for babel issue
bundle exec rails webpacker:install since upgraded. Had to remove spaces from folder names
`yarn upgrade`

https://stackoverflow.com/questions/58520418/rails-webpacker-compile-error-on-production-enviorment
This is for production environment, but I tried the following anyway.
`yarn add @rails/webpacker`
`bundle update webpacker`
Didn't help me.

Moved `/app/javascript/stylesheets/application.scss` to `/app/javascript/packs/application.scss`

Removed .babelrc per rossta `yarn upgrade` and now can load page.

### moving on from there with Webpacker
Although it may not be as fast or efficient, put all .js in app/javascript/src. Saves figuring out which one where. Can fix later. 
https://rossta.net/blog/webpacker-with-bootstrap.html 
extract_css: true for development in config/webpacker.yml
Only one  <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %> // only application

Now need to clean up references to .js. In crores I got rid of the $(document).ready(function() { on a page
L.BingLayer error went away when tried to define. Suspect it will come back
Bootstrap more or less working, but no maps show.

Can't include other jS in main jS. Pages work if have all jS in the main html file. Sprockets worked better for me, but main problem is not understanding jS and Webpacker. 

So everything is stuffed into _map_and_control.html.erb

Git not working in TM

Overview map fixed with partials too.

But in streets>show, not clearing some of the "cache" and can't load a second time.

Turned off Turbolinks because previousLayer was persisting.

Added jquery-ui for L.opacityControls. Didn't help, still getting an error: `L.Control.opacitySlider is not a constructor

`yarn add leaflet.control.opacity` as a replacement for above. See if I can make it work. (removed later) https://github.com/dayjournal/Leaflet.Control.Opacity. Has other issues working right. Some with CSS and it's purpose is enough different from what I want to do  that I would have to modify it. Separate controls to turn on and off a layer and a **slider for each** layer to control opacity. Should have been combined or something. 
## 59-fixing-streets-show 2020.06.29
Abandoned since about May 30, 2018 at 1:54 PM . need to check that for sure though. Webpack is installed and implemented to some extent. `bundle install`
Git error, diff showed
fatal: ambiguous argument 'UsersgscarDocumentsCroatian Restaurants Project-CroResLA Historical Street Names': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

* Webpacker had been implemented
streets>edit throws an error editMap not defined
    $(document).ready(function() {
       editMap(popupText); // editMap() is in assets/javascripts/packs/streets.js 
    });  
Aren't packs supposed to automatically be loaded? "Webpack does not expose your JavaScript to the global scope; every file is treated as a module, which, in practice, is a function with its own scope. To expose a particular reference to the global scope, you can assign it to the window object, e.g., window.editMap = editMap, from within the module." @rossta

Tried `import "streets"` Missing module. Moved streets and 
`import '../src/streets.js'` and now onto other errors
`L.BingLayer is not a constructor`
`import '../src/leaflet-bing-layer.js'` Didn't help
Dropped Bing layer for the moment, now back to editMap not defined again ?
Now ` L.Control.Draw is not a constructor` something about `L …` and
 moving jS to an html.erb partial. 
 So moving to partials approach isn't going to work. Need to do the jS right !!!! Just pushing the problem down the road.
 
edit:610 Uncaught TypeError: L.Control.opacitySlider is not a constructor:  https://stackoverflow.com/questions/38930066/typeerror-l-control-draw-is-not-a-constructor
  
`yarn add leaflet-draw` Seems like I should have this

Added var to function editMaps in streets and it removed the problem `Uncaught ReferenceError: editMap is not defined`

Things tried to fix above.
`yarn add --dev webpack-bundle-analyzer` https://rossta.net/blog/webpacker-output-analysis-with-webpack-bundle-analyzer.html
`yarn webpack:analyze` to see the results in a browser. Don't understand it.
Moved streets.js up in application.js to see if that would help. No go
`RAILS_ENV=development node -e 'console.dir(require("./config/webpack/development"), { depth: null })'` Didn't show me anything, but what do I know
`yarn add mapbox.js` and removed CDN, but included Leaflet version is older
https://stackoverflow.com/questions/62649100/why-is-an-existing-javascript-function-not-found-generating-uncaught-referenceer/62649412#62649412 showed to add window.editMap = editMap to streets.js

Now the problem is (but may check a few other things first related to my including jS via render partials.)
streets.js:220 Uncaught TypeError: L.Control.Draw is not a constructor. Drawing tools and opacity slider missing. Same issue as earlier
`import 'leaflet-draw' `to `application.js` moved the problem along
Uncaught TypeError: $(...).imageMapResize is not a function  at editMap 
`yarn add leaflet-bing-layer` and added to  `application.js`

Trying to solve `69:234 Uncaught TypeError: L.BingLayer is not a constructor` but didn't help, but still probably a good thing to do.

Done with scripts in partials, but much to sort out.
`yarn add leaflet.timeline` For map/overview. Didn't work so continued with downloaded version which was customized by me. Removed

Copied OpacitySlider images to app/javascript/stylesheets/images because .css expects to find them there
Opacity Slider missing from streets>show and edit `L.Control.opacitySlider is not a constructor`
`Uncaught TypeError: $(...).slider is not a function` Now
import 'jqueryui' // in application.js. seeing if it will help with opacity slider not showing on streets/. Got rid of the error, but slider not showing. If look at code and roll over the divs, the opacity slider lcoation shows up

No opacity slider of only css is <link  href='https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css' rel='stylesheet' /> 

Merged scaffold.scss into custom

Tried adding the following to streets>show page in a script. No help. This is formatted wrong. Learn CSS
.opacity_slider_control .ui-slider-range {
    height: 200px;
}

Tried `import 'leaflet'`instead of `import 'mapbox.js/node_modules/leaflet/src/Leaflet.js'`.  No help
Looked for zero-width spaces: &#8203; and U+200. Not found 

Moved element in Chrome to just in the map, i.e., direct child of #map and still the same. Which means it's one of the 

Finally started down the right track. Got the .opacity_slider_control SCSS correct.

Now trying Mapbox Opacity Slider https://docs.mapbox.com/mapbox.js/example/v1.0.0/opacity/
file:///Users/gscar/Documents/GIS%20&%20Mapping/Mapbox.OpacitySlider.html
2020.08.08 After migrating to OWC SSD PGAdmin wouldn't work. I deleted (after archiving) all in Library>Application Support>Postgres and then PGAdmin would start. 
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d la_street_history_development la_hist.2020.07.03.dump
First need extension postgis CREATE EXTENSION postgis_tiger_geocoder CASCADE;
then reran pg_restore seemed to work.

2020.08.20 Changing to webpacker seems to have messed up how pages and the parts load. One is that /overview comes up without background or overlay maps. There were defaults before. They will show up by selecting them. The street segments show up.

heroku not working. `NoSuchBucketThe specified bucket does not existcrores_heroku4743A413A2A1015CLeMV19sBarSuMPIPYaQlSSNbs/cwM1UoNVP57NsInKLSN1JwnNw9CqvoXTTX6aq1c+dVM8/bQ1E=` Downloaded db and it is similar size to old, so apparently not a problem with  the database.
Am I uploading anything to AWS via the website?
Added s to http on error page and reset `heroku config:set ERROR_PAGE_URL=//https://crores.s3.amazonaws.com/heroku_error_page.html` and now it works.

Can't draw on site, but can here. Will upload. Has bugs though. Now can draw on site.
But no maps show when click on edit, etc. for other buginess

Started to change Sanborn Map links forgetting now in the database.

`ruby-install ruby 2.7.2 `to reduce friction with Heroku. Updated Homebrew
`brew install git-lfs` to see if get rid of an error. I probably had this early in doc storage. Should be able to get rid of it
`git init` to try fix the` fatal: not a git repository (or any of the parent directories): .git fatal: not a git repository (or any of the parent directories): .git fatal: not a git repository (or any of the parent directories): .git` when trying to commit. Didn't help
Tried changing permissions of .git to everyone read-write no help
Moved .git_attributes and .git_ignore and didn't help
`git commit -m "kkk"` on command line works, or at least `git status
### On branch 60-moving-on
nothing to commit, working tree clean` thinks so
Add the file that you just made changes to by clicking the “+”
In the text box write in your commit message (if you’re wanting to know how to write better commit messages I found this article helpful). Then click the check mark.
VSCode is happy. But TextMate still isn't

2021.03.09 Need to update stack per notice "Your Heroku account has one or more apps running on the Heroku-16 stack, which reaches end-of-life on May 1st, 2021." Ruby 2.7.2 and Rails 6.0.1 seem current enough
Going from heroku-16 to -20. Instructions cover temporary and testing. I will just go for it, once I figure it out.
"To upgrade via the Heroku CLI, use the stack:set command on your production app:
$ heroku stack:set heroku-20 -a <app name>"
  heroku stack:set heroku-20 -a stark-cove-20051, then I'll merge and push
 " Eegad! You're not on a branch" when tried to git commit in TM
 But TM thinks "Already on '60-moving-on'"

Started to change Sanborn Map links forgetting now in the database.
Switched to a new branch '61-post-stack-upgrade'. I think that git and TM now are on the same branch. Forgot how to merge changes. No TM is still confused. Fix sometime. But for now use command line for Git.
### 62-giving-up-on-61
61-post-stack-upgrade wasn't working, so started over from master which does work on Heroku unless I'm confused which is possible
But even this new branch from what would be 60-moving-on has issues. Also Git is still confused or least TM is confused about it.
Error:  Rendered static_pages/home.html.erb within layouts/application (Duration: 298.8ms | Allocations: 13515)
[Webpacker] Compiling...
[Webpacker] Compilation failed:
[webpack-cli] Failed to load '/Users/gscar/Documents/Croatian Restaurants Project-CroRes/LA Historical Street Names/la_hist_street/config/webpack/development.js' config
[webpack-cli] TypeError: Cannot read property 'plugins' of undefined
    at Object.<anonymous> (/Users/gscar/Documents/Croatian Restaurants Project-CroRes/LA Historical Street Names/la_hist_street/config/webpack/environment.js:17:13)
      
Copied over config/webpack/environment.js from crores and still doesn't work, page loads but no Bootstrap
Hadn't looked at browser console errors, but seeing what I saw before:
TypeError: this.getOptions is not a function
    at Object.loader (/Users/gscar/Documents/Croatian Restaurants Project-CroRes/LA Historical Street Names/la_hist_street/node_modules/sass-loader/dist/index.js:25:24)
`sass-loader` which is coming from where? 
`yarn add sass-loader@^10.1.1` should downgrade, recent problem for many
Upgraded to ruby-2.7.2 since it's the end of the line and just one less thing to think about

Look at SourceTree and see the other "improvements" that might be useful. Maybe reorganized webpacker to latest guides. recommendations. But mainly a matter of style. I tried making this rearrangement, but failed with getting access to application.scss right. Leave well enough alone `If It Works Don't Fix It`
  source_path: app/packs
  source_entry_path: entrypoints

`gem 'activerecord-postgis-adapter'` default may now work, but will have to try again

Some overlay maps are not loading

heroku config:set --remote heroku-20 etc. Said I was out of date. bundle update required it seemed. Failed at updating. Since no one is contributing, I'll just move the master db  back to localhost. It seems the db is too big, but it still can serve. IIRC, technically heroku doesn't care. Assumes it is the master. I just need to change localhost to use downloaded version, i.e., point the app. IIRC it's done with pg. Where is the db on localhost.
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d la_street_history_development latest.dump
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d la_street_history_development "/Users/gscar/Documents/Croatian Restaurants Project-CroRes/LA Historical Street Names/la_hist_street/db/dumps/latest.from_Heroku.2021.06.13.dump"
NOT SURE THIS HAPPENED, NO FEEDBACK.
Some fixes for webpacker set up. Image and jQuery
### Heroku going away
Downloaded db, but app doesn't look good on localhost. Fix while can see at Heroku

import db to MBA (since trying with large screen). iCloud sync is way slow

Put the Rails app on iCloud so can use on all 3 Macs. Took a long time to propagate, so tried making it a Shared folder and invited myself. Supposed to speed up syncing. Still was slow
Importing to MBP for testing `psql la_street_history_development < la_hist_streets_dump.sql` db name is what I've been using. See `database.yml` Database didn't exist, so created in PGAdmin. Owner `gscar` which is same as on iMac. Now opens on MBP, but serious formatting problems. Lots of errors showing in server report (iTerm) and in developer console. Some Node modules not connecting. Ran `yarn` Several errors, one about Python availablility. Looking for python2, `which python3` is good but `python --version` fails. Do I need both? Not sure this is the issue. Focus on Chrome>console errors

OK, so runs with format (some js not working?)merrors on MBP, but

`yarn` for he heck of it and another `bundle install` and now it works fine on MBA. So can go for fly.io from MBA.

`fly dashboard`says no app so run:

that is, following https://fly.io/docs/rails/getting-started/migrate-from-heroku/

`fly launch` I gave a name `la-hist-streets` and yes to create a postgresql database

la_hist_street on  62-giving-up-on-61 [$✘!?] via ⬢ v18.8.0 via 💎 ruby-2.7.6
➜ fly launch
Creating app in /Users/gscar/Documents/Croatian Restaurants Project-CroRes/LA Historical Street Names/la_hist_street
Scanning source code
Detected a Rails app
? App Name (leave blank to use an auto-generated name): la-hist-streets
Automatically selected personal organization: Greg S
? Select region: lax (Los Angeles, California (US))
Created app la-hist-streets in organization personal
Wrote config file fly.toml
? Would you like to set up a Postgresql database now? Yes
For pricing information visit: https://fly.io/docs/about/pricing/#postgresql-clusters
? Select configuration: Development - Single node, 1x shared CPU, 256MB RAM, 1GB disk
Creating postgres cluster la-hist-streets-db in organization personal
Postgres cluster la-hist-streets-db created
  Username:    postgres
  Password:    2ace6e7f9d4f0e4991864ced23294ffb91d674e75e01aacb
  Hostname:    la-hist-streets-db.internal
  Proxy Port:  5432
  PG Port: 5433
Save your credentials in a secure place -- you won't be able to see them again!

Monitoring Deployment

1 desired, 1 placed, 1 healthy, 0 unhealthy [health checks: 3 total, 2 passing, 1 critical]
--> v0 deployed successfully

Connect to postgres
Any app within the personal organization can connect to postgres using the above credentials and the hostname "la-hist-streets-db.internal."
For example: postgres://postgres:2ace6e7f9d4f0e4991864ced23294ffb91d674e75e01aacb@la-hist-streets-db.internal:5432

Now that you've set up postgres, here's what you need to understand: https://fly.io/docs/reference/postgres-whats-next/ [ which I don't think applies to this where I have a db to upload ]

Postgres cluster la-hist-streets-db is now attached to la-hist-streets
The following secret was added to la-hist-streets:
  DATABASE_URL=postgres://la_hist_streets:cWiEQ023MDUDWPQ@top2.nearest.of.la-hist-streets-db.internal:5432/la_hist_streets
Postgres cluster la-hist-streets-db is now attached to la-hist-streets

Your Rails app is prepared for deployment. Production will be set up with these versions of core runtime packages:

Ruby 2.7.6
Bundler 2.3.3
NodeJS 18.8.0

You can configure these in the [build] section in the generated fly.toml.

Ruby versions available are: 3.1.2, 3.0.4, and 2.7.6. Learn more about the chosen Ruby stack, Fullstaq Ruby, here: https://github.com/evilmartians/fullstaq-ruby-docker.
We recommend using the highest patch level for better security and performance.

For the other packages, specify any version you need.

If you need custom packages installed, or have problems with your deployment build, you may need to edit the Dockerfile
for app-specific changes. If you need help, please post on https://community.fly.io.

Now: run `'fly deploy'` to deploy your Rails app.

23 2.974 Yarn executable was not detected in the system. and another error around webpacker.

Maybe need to change the asset pipeline. Argh! What's the path, Ruby 3, Rails 7, then asset pipeline.

https://guides.rubyonrails.org/upgrading_ruby_on_rails.html
Rails 7 requires Ruby 2.7.0 or newer. So maybe upgrade to Rails 7, then worry about Ruby 3
It's a good idea to upgrade Ruby and Rails separately. Upgrade to the latest Ruby you can first, and then upgrade Rails.
When changing Rails versions, it's best to move slowly, one minor version at a time. Now at 6.0.1
To 6.1 https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#upgrading-from-rails-6-0-to-rails-6-1
https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#active-storage-now-requires-image-processing seems like the only thing that might apply in may case

When ready for 6 to 7 https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#upgrading-from-rails-6-1-to-rails-7-0
See Rails upgrading
gem "image_processing", "~> 1.0" # Rails 6.1 upgrade

`fly wireguard create` > la-hist.conf and load into Wireguard app

To upload db https://community.fly.io/t/pg-database-migration-from-heroku-not-working/6881/8:
`pg_restore -v -d postgres://la_hist_streets:cWiEQ023MDUDWPQ@top2.nearest.of.la-hist-streets-db.internal:5432/la_hist_streets < db/dumps/latest.from_Heroku.2022.08.26.dump`
Works but some errors 'multiple primary keys'


#### Done on MBA, so db on iMac and MBP are out of date
removed column extent from streets. Not used and was blank. Also removed Extensions (PGAdmin) postgis and postgistiger?. Not being used and were created notices on Fly.io migrations
schema.rb seems to be regenerated on rgm, but not structure.sql 
Added `config.active_record.schema_format = :sql` and now rdm generates db/structure.sql

#### Beyond webpacker
Next would be to get rid of webpacker. But is it worth is for this now? And can't add new streets right now as there is a bug

[![](https://data.jsdelivr.com/v1/package/npm/leaflet.timeline/badge)](https://www.jsdelivr.com/package/npm/leaflet.timeline)

https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0/leaflet.js

Can draw segments in Safari but not usually Chrome, but saved in neither.