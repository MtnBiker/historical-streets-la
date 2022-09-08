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
Check https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#upgrading-from-rails-6-1-to-rails-7-0-spring
https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#sprockets-is-now-an-optional-dependency
zeitwork https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#applications-need-to-run-in-zeitwerk-mode






===== diff just to have copy
--- development.rb
+++ (clipboard)
@@ -1,10 +1,8 @@
-require "active_support/core_ext/integer/time"
-
 Rails.application.configure do
   # Settings specified here will take precedence over those in config/application.rb.
 
-  # In the development environment your application's code is reloaded any time
-  # it changes. This slows down response time but is perfect for development
+  # In the development environment your application's code is reloaded on
+  # every request. This slows down response time but is perfect for development
   # since you don't have to restart the web server when you make code changes.
   config.cache_classes = false
 
@@ -25,13 +23,15 @@
       'Cache-Control' => "public, max-age=#{2.days.to_i}"
     }
   else
-    config.action_controller.perform_caching = false
+    config.action_controller.perform_caching = true
 
     config.cache_store = :null_store
   end
-
-  # Store uploaded files on the local file system (see config/storage.yml for options).
-  config.active_storage.service = :local
+  
+  # https://blog.bigbinary.com/2020/07/29/rails-6-1-adds-annotate_rendered_view_with_filenames-to-annotate-html-output.html
+  # Now the rendered HTML will contain comment indicating the begining and end of each template.
+  # Off until update to Rails 6.1
+  # config.action_view.annotate_rendered_view_with_filenames = true
 
   # Don't care if the mailer can't send.
   config.action_mailer.raise_delivery_errors = false
@@ -41,12 +41,6 @@
   # Print deprecation notices to the Rails logger.
   config.active_support.deprecation = :log
 
-  # Raise exceptions for disallowed deprecations.
-  config.active_support.disallowed_deprecation = :raise
-
-  # Tell Active Support which deprecation messages to disallow.
-  config.active_support.disallowed_deprecation_warnings = []
-
   # Raise an error on page load if there are pending migrations.
   config.active_record.migration_error = :page_load
 
@@ -62,15 +56,25 @@
   config.assets.quiet = true
 
   # Raises error for missing translations.
-  # config.i18n.raise_on_missing_translations = true
-
-  # Annotate rendered view with file names.
-  # config.action_view.annotate_rendered_view_with_filenames = true
+  # config.action_view.raise_on_missing_translations = true
 
   # Use an evented file watcher to asynchronously detect changes in source code,
-  # routes, locales, etc. This feature depends on the listen gem.
-  config.file_watcher = ActiveSupport::EventedFileUpdateChecker
-
-  # Uncomment if you wish to allow Action Cable access from any origin.
-  # config.action_cable.disable_request_forgery_protection = true
+  # routes, locales, etc. This feature depends on the listen gem. 
+  # https://stackoverflow.com/questions/38663706/loaderror-could-not-load-the-listen-gem-rails-5
+  # config.file_watcher = ActiveSupport::EventedFileUpdateChecker
+  
+  # Hartl Listing 11.2.2 
+  config.action_mailer.raise_delivery_errors = true
+  config.action_mailer.delivery_method = :test
+  host = 'localhost:3000' # Don't use this literally; use your local dev host instead
+  config.action_mailer.default_url_options = { host: host, protocol: 'https' }
+  
+  # Moved to here from destination mentioned below because of error uploading to Heroku
+  # e.g. in config/initializers/better_errors.rb
+  # This will stop BetterErrors from trying to render larger objects, which can cause
+  # slow loading times and browser performance problems. Stated size is in characters and refers
+  # to the length of #inspect's payload for the given object. Please be aware that HTML escaping
+  # modifies the size of this payload so setting this limit too precisely is not recommended.  
+  # default value: 100_000
+  # BetterErrors.maximum_variable_inspect_size = 100_000 # Shutoff because of some error, removed gem too
 end
