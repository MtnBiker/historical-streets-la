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