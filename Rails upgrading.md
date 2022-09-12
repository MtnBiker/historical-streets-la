### Rails, Ruby upgrades and moving to fly
Change the Rails version number in the Gemfile and run bundle update.
Change the versions for Rails JavaScript packages in package.json and run yarn install, if running on Webpacker.
Run the Update task.
Run your tests. bin/rails app:update
 
 
 Checks for upgrading

/
/map run the timeline
check that both overlays work (upper and right)

/all streets

street search

login

Add a street: tedious, but is key

Log out

======

gem "image_processing", "~> 1.0" # Rails 6.1 upgrade
`bundle install`
quick check of /map and edit a street, this should be a minor change
====
Rails 6.1
bundle update
Segment drawing in new street does not work   $('map').imageMapResize(); in street.js

`bin/rails app:update`
overwrote config/boot.rb but can't see any difference, yes, double quotes vs. single quotes
config/routes.rb Overwrote, but I restored since the new one was empty

config/application.rb TODO see if this is really needed
    config.serve_static_assets = true # https://devcenter.heroku.com/articles/rails-4-asset-pipeline

config/environment.rb Double/single quote change

config/puma.rb a few lines added relating to develpment 

Accidentally closed iTerm window here and started over with app:update

config/environments/development.rb see below. Copied over some changes

config/environments/production.rb ## some brought over from Hartl for mailer, but specific to Heroku commented out

config.ru # differences but what do I know

Then on trying to overwrite /bin/yarn got error 
`rails aborted!
LoadError: cannot load such file -- listen`

Fail on `rs`
Tried `yarn` Still fail on `rs`

`bin/rails server --environment=production` no server launch errors but get error in Chrome on page load
`EDITOR="mate --wait" bin/rails credentials:edit` to get `rs` since said it needed the secret

Not a gem problem as commenting out all dev gems still doesn't work in development mode.
Needed gem listen. App works except can't create segment. FIXME
So now at rails (6.1.6.1)
I don't see any relevant changes I need. I don't have image processing
===
Rails 7
Change the versions for Rails JavaScript packages in package.json and run yarn install, if running on Webpacker.
I think I got the above

app:upgrade, but now deal with the following. Got an error when `rails active_storage:update` 

Check https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#upgrading-from-rails-6-1-to-rails-7-0-spring - not using Spring, but if do turn it on
https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#sprockets-is-now-an-optional-dependency `gem "sprockets-rails"`. I think I still have Sprockets and will continue to. Still rs errors
zeitwork https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#applications-need-to-run-in-zeitwerk-mode
https://guides.rubyonrails.org/classic_to_zeitwerk_howto.html
➜ bin/rails runner 'p Rails.autoloaders.zeitwerk_enabled?'
true

Add `gem "net-http"` was suggested to get rid of the error. Can remove once successful. Not quite. This wasn't the real problem with launching. The next para describes. But removing the gem creates an error on launch, but the app does launch. Will leave in for a while
Now have new error on `rs`

Error about rails_admin_user_for_paper_trail.rb commented out all and now can launch
But extent.json not being created when add or edit a street. Previous ones are displayed.

Going through: config/initializers/new_framework_defaults_7_0.rb TODO
Try two at a time 2, 4, 6, 8 (up to line 53), 11 (65) street extent now can be drawn!! Guessing line 61 (I changed three at a time)
14 (76) Now can't draw extent! But rolling back the changes didn't help. So some js error
15 () vips, so maybe using
Got through them all and mostly workds

streets.js:473 Uncaught TypeError: Cannot set properties of null (setting 'onmousedown') on /map
streets.js:270 Uncaught TypeError: $(...).imageMapResize is not a function in console for new street (which maybe wasn't watching before, error exists) FIXME

Oops. I hadn't worked through new_framework_defaults_6_0 or 6_1.rb and got an error when changed in application.rb
Work through those OK with 6.0. and 6.1. Didn't see any issues except
Had to put `Rails.application.config.action_dispatch.cookies_serializer = :hybrid` in for something to do with Hartl logins

Now to Ruby 3 which guide said I should have done before Rails upgrade

First tried a `fly deploy` and stopped at migrations, so I hide all the migrations by renaming and try again.
Success, now the db and succeeded. See Implementation notes

chruby ruby-3.1.2 and works

Now move beyond webpacker. See Implementation Notes

