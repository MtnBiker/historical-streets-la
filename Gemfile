# number is minimum
# >= upgrade even to major version, i.e, for ever
# ~> upgrade but not to the next major version, e.g, if ~> 1.14, upgrade but not to 2.0

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.5.0' # Heroku wants this.
# gem 'bundler', "1.16.1" # no problem when installed bundler with a new version of Ruby.

gem 'rails', '~> 5.1.4' # Why not 5.2? Careful of scripts see https://bauland42.com/ruby-on-rails-content-security-policy-csp/o
# Use postgresql as the database for Active Record
gem 'pg' , '~> 0.18' # removed qualification to try an help with heroku push problem, but bundle still showing 0.18.4 2017.08.23. Put qualification in to see if helps with server problem (Jan 2018), it did. Apparently v1.0.0 just released and something hasn't caught up. 
# Use Puma as the app server
gem 'puma'
# Use SCSS for stylesheets
# gem 'sass-rails', '~> 5.0' # Not compatible with Bootstrap 4
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
gem 'bootstrap', '~> 4.0.0' # bootstrap-sass is not compatiable with 4 (https://github.com/twbs/bootstrap-rubygem)
# gem "bootstrap_form", # See implementation notes, I tried it
#     git: "https://github.com/bootstrap-ruby/bootstrap_form.git",
#     branch: "master"
gem "comfy_bootstrap_form", "~> 4.0.0" # https://github.com/comfy/comfy-bootstrap-form
gem "font-awesome-rails" # wanted to use an icon for search. Might be easier to just use CDN
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
# gem 'turbolinks', '~> 5' # didn't play well with Leaflet on my pages, probably because my JavaScript is less than well written.
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder' , '~> 2.7'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.11'
# Undo changes and record of who changed what
gem 'paper_trail'
gem 'carrierwave', '1.1.0' # Rails 5.2 may add this capability

# Leaflet included in mapbox 3.1.1 which is loaded in application.html.erb. PS: mapbox-rails is a year or two behind
# gem 'leaflet-rails'
gem 'activerecord-postgis-adapter'
gem 'rgeo-geojson'
gem 'leaflet-draw-rails' # v0.4.9 as of Sept 17. Current leaflet.draw.js is 0.4.10 (July 3, 2017)

# gem 'webpacker' # I'm not ready to tackle webpack. Not simple. I removed everything that was installed by webpacker
# jQuery
gem 'jquery-rails' # This needed by Bootstrap 4. Includes versions 1,2,3. Can select one or the other in application.js. Bootstrap 4 says use jquery3
gem 'jquery-ui-rails' # needed by Leaflet.OpacityControls (slider)
gem 'tether-rails' #  without this runs fine except I can't upload to heroku, error. 

gem 'gon'
gem 'aws-sdk', '~> 2.3' # Needed for AWS

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.5.1'
  gem 'listen', '>= 3.0.8', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  # gem 'spring'
  # gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'database_cleaner'
  gem 'rubocop', require: false # on command line `rubocop`
  # gem 'factory_girl_rails'
  gem 'awesome_print' # Prefs in ~/.irbrc
  # http://undefined-reference.org/2016/01/31/super_awesome_print-as-debugger.html
  gem 'super_awesome_print' # Gilmore just uses awesome_print may be enough.
  gem "rails-erd" # Entity-Relationship Diagrams, `rake erd` or `bundle exec rake erd` to get a pdf http://voormedia.github.io/rails-erd/install.html
  # Copy db from (and to?) Heroku
  # To see an updated list of tasks and descriptions: rake heroku_db_restore -T heroku_db_restore
  gem 'heroku_db_restore'
end # development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-byebug' # binding.pry
  gem "better_errors"
  gem 'binding_of_caller'
  gem 'dotenv-rails' # See p198 Clark. Right now I just have Mapbox credential. But I'm using it for AWS I think. Moved to dev and test based on https://github.com/bkeepers/dotenv
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end #  development, test

group :test do
  gem 'minitest-reporters', '1.1.9'
  gem 'guard',              '2.14.1' # Rails 5 Hartl
  gem 'guard-minitest',     '2.4.6' # '2.4.4' Rails 5 Hartl
  gem 'rails-controller-testing', '1.0.2' # with Rails 5 Hartl
  # Creates /coverage/index.html which details MiniTest coverage
  gem 'simplecov', :require => false
end # test

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem. Do I need these?
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
