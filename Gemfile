# number is minimum
# >= upgrade even to major version, i.e, for ever
# ~> upgrade but not to the next major version, e.g, if ~> 1.14, upgrade but not to 2.0

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '3.1.2' # Rails 7 minimum 2.7

gem 'rails', '~> 7.0' # Careful of scripts see. https://bauland42.com/ruby-on-rails-content-security-policy-csp/o. Also see development.rb if update to 6.1
# Use postgresql as the database for Active Record
gem 'pg' , '~> 1.4.3' # Was 0.18.4 2022.09.06 and wouldn't upgrade, so put in latest version. Seems to work at least on localhost.
gem "net-http" # supposedly temporary to fix an upgrade to Rails 7 issue. Leaving in removes a launch error, but the app does launch
# Use Puma as the app server
gem 'puma' # , '3.4' FIXME-2020.06.16
# Use SCSS for stylesheets. Was in rossta and makes sense. sass-rails depends on sassc-rails
# both sass-rails and sassc-rails depend on ffi which I can't install
# gem 'sassc-rails' # Could use sassc-rails, but probably more than I need. https://github.com/sass/sassc-rails
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 5.0'
gem "sprockets-rails" # https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#sprockets-is-now-an-optional-dependency
gem 'bootsnap', require: false  # FIXME-2020.06.16
# Use Uglifier as compressor for JavaScript assets
# gem 'uglifier' # not needed with Webpacker
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# gem 'bootstrap', '~> 5.0.0' #  FIXME-2020.06.16 # gem 'bootstrap', '~> 4' # Using Webpacker now
# gem "bootstrap_form", # See implementation notes, I tried it
#     git: "https://github.com/bootstrap-ruby/bootstrap_form.git",
#     branch: "master"
# gem "comfy_bootstrap_form", "~> 4.0.0" #  FIXME-2020.06.16 https://github.com/comfy/comfy-bootstrap-form hard to tell if I'm using this, but if a form breaks, maybe
# gem "font-awesome-rails" # wanted to use an icon for search. Might be easier to just use CDN
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
# gem 'turbolinks', '~> 5' # didn't play well with Leaflet on my pages, probably because my JavaScript is less than well written. FIXME? turned back on for Rails 6. I think it's coming from Webpacker now
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder' , '~> 2.9'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.11'
# Undo changes and record of who changed what
gem 'paper_trail'
gem 'carrierwave', '1.1.0' # Rails 5.2  added this capability, but requires reworking

gem "image_processing", "~> 1.0" # Rails 6.1 upgrade, but I don't think I'm using this

# Leaflet included in mapbox 3.1.1 which is loaded in application.html.erb. PS: mapbox-rails is a year or two behind
# gem 'leaflet-rails'
gem 'rgeo-geojson'
gem 'leaflet-draw-rails' # v0.4.9 as of Sept 17. Current leaflet.draw.js is 0.4.10 (July 3, 2017)

# jQuery
# gem 'jquery-rails' # This needed by Bootstrap 4. Includes versions 1,2,3. Can select one or the other inapplication.js. Bootstrap 4 says use jquery3
# gem 'jquery-ui-rails' # needed by Leaflet.OpacityControls (slider)
# gem 'tether-rails' #  without this runs fine except I can't upload to heroku, error.

gem 'gon'
# gem 'aws-sdk', '~> 2.3' # Needed for AWS  FIXME-2020.06.16 switched with below
gem 'aws-sdk-s3', '~> 1'# Since got error when pushing in 2020. Let's hope there aren't new issues

# None of these are needed at least to get server running
group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  # gem 'web-console', '>= 3.5.1' # bindex error on rs  FIXME
  gem 'listen' # webpacker wants or its install does, but I don't have it in Crores. Put back in to see if fly deploy would be helped. Didn't help. Put back in because of error in Rails 6.1 and now app works or at least it loads
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  # gem 'spring'
  # gem 'spring-watcher-listen', '~> 2.0.0'
  # gem 'database_cleaner' #  FIXME-2020.06.16
  # gem 'rubocop', require: false # on command line `rubocop`  FIXME-2020.06.16
  gem 'rubocop-rails' # on command line `rubocop --require rubocop-rails --rails` # from Crores
  # gem 'factory_girl_rails'
  gem 'awesome_print' # Prefs in ~/.irbrc
  # http://undefined-reference.org/2016/01/31/super_awesome_print-as-debugger.html
  gem 'super_awesome_print' # Gilmore just uses awesome_print may be enough.
  gem "rails-erd" # Entity-Relationship Diagrams, `rake erd` or `bundle exec rake erd` to get a pdf http://voormedia.github.io/rails-erd/install.html
  # Copy db from (and to?) Heroku
  # To see an updated list of tasks and descriptions: rake heroku_db_restore -T heroku_db_restore
  # gem 'heroku_db_restore' # leaving heroku
end # development

#  better_errors is needed, others seem to be optional
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  # gem 'byebug', platforms: [:mri, :mingw, :x64_mingw] # getting an error FIXME
  # gem 'pry-byebug' # binding.pry
  # gem "better_errors" # server won't work without this
  # gem 'binding_of_caller'
  gem 'dotenv-rails' # See p198 Clark. Right now I just have Mapbox credential. But I'm using it for AWS I think. Moved to dev and test based on https://github.com/bkeepers/dotenv
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end #  development, test

group :test do
  gem 'minitest-reporters', '1.1.9'
  # gem 'guard',              '2.14.1' # Rails 5 Hartl  FIXME-2020.06.16
  # gem 'guard-minitest',     '2.4.6' # '2.4.4' Rails 5 Hartl  FIXME-2020.06.16
  # gem 'rails-controller-testing', '1.0.2' # with Rails 5 Hartl #  gem 'rails-controller-testing'# with Rails 5 Hartl, but removed version because of bundle error  FIXME-2020.06.16 Bundler could not find compatible versions for gem "actionpack":
  # Creates /coverage/index.html which details MiniTest coverage
  gem 'simplecov', :require => false
  # gem 'database_cleaner' # https://github.com/DatabaseCleaner/database_cleaner Have I ever used htis
  gem 'database_cleaner-active_record' # may be enough
end # test

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem. Do I need these?
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
