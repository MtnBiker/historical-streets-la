# README
Rails 5.1 since supposed to have beter JS asset management, Ruby 2.4
https://stark-cove-20051.herokuapp.com/ | https://git.heroku.com/stark-cove-20051.git
https://github.com/MtnBiker/historical-streets-la.git

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

Looking at editing in place

https://github.com/janv/rest_in_place. Simple gem ? Try this first in a git

https://github.com/infinum/phrasing Lots of pieces but may do the job

https://adityashedge.wordpress.com/2014/01/05/in-place-editable-table-with-jquery/, not clear to me how to implement. Apparently add the .js, But simple. Easiest to try

https://github.com/bootstrap-ruby/bootstrap-editable-rails Looks fairly straightforward. I think it wraps http://vitalets.github.io/x-editable/index.html  into a Rails gem
Added Procfile from crores5 to satisfy Heroku

heroku run rake db:migrate Did the database get sent?

bundle exec gem install bundler failed to stop message: "Warning: the running version of Bundler (1.13.7) is older than the version that created the lockfile (1.15.0). We suggest you upgrade to the latest version of Bundler by running `gem install bundler`."

jquery-3.2.1.min.js in application/javascript didn't stop error "Sprockets::FileNotFound: couldn't find file 'jquery' with type 'application/javascript'" with heroku push

removed and added jquery and bootstrap alpha

Tried different JS edit in table and none worked. See the git forks. Comments on the last one below

Giving up on bootstrap-editable. Check git for all the ones I tried and couldn't make work.
Maybe a versioning problem with jQuery and/or Bootstrap. Demos work OK, but I try different versions and still get errors. Usually of a different type.
This one does appear to be well-supported, both in RoR and in general.

leaflet-draw in place via gem which seems to be kept up to date. Drawing now working. Next get the result to Postgres

See git for progress. Drawing works and results to Postgres

**Had to do a stash because messed up some merges or forgot to save.**