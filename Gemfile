source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end
# ruby '2.3.4' # Heroku wants this. I have 2.4.0, but is Heroku only to 2.3.4
gem 'bundler', '1.15.1' # 1.13.7 may be the latest version heroku is supporting 2017.06.03

gem 'rails', '~> 5.1.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.20'
# Use Puma as the app server
gem 'puma', '3.4' # not sure of latest version that will work, but 3.9.1 doesn't work. I thought I had 3.7 before and it worked but now it doesn't
# Use SCSS for stylesheets
# gem 'sass-rails', '~> 5.0' # I have a note that may not need with Bootstrap 4
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 3.2.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# gem 'bootstrap', '~> 4.0.0.alpha6' # Don't think -sass is needed with 4. Causes problems in Header
gem 'bootstrap-sass', '3.3.7' # Hartl 5 2017.06.07 No problem as first go. One Stackoverflower said not to have this with gem 'bootstrap', but I want v4
# Use CoffeeScript for .coffee assets and views
# gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.11'
gem 'carrierwave',             '1.1.0'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'leaflet-rails'
gem 'activerecord-postgis-adapter'
gem 'rgeo-geojson'
gem 'leaflet-draw-rails'

# jQuery
gem 'jquery-rails' # without this jQuery runs fine except I can't upload to heroku. This needed by Bootstrap 4
gem 'tether-rails' #  without this runs fine except I can't upload to heroku, error. Still getting error, but no jquery error `yarn add tether` didn't help.Sprockets::FileNotFound: couldn't find file 'tether' with type 'application/javascript'.
gem 'jquery-ui-rails' # Does this also bring in jQuery

# Added for Hartl tutorial and can be used with streets, but I want an option. May be better with edit in table
gem 'will_paginate',           '3.1.5'
gem 'bootstrap-will_paginate', '1.0.0'

gem 'gon'

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
  gem 'dotenv-rails' # See p198 Clark. Right now I just have Mapbox credential. But I'm using it for AWS I think.
  gem 'awesome_print' # Prefs in ~/.irbrc
  # http://undefined-reference.org/2016/01/31/super_awesome_print-as-debugger.html
  gem 'super_awesome_print' # Gilmore just uses awesome_print may be enough.
  
  # Copy db from (and to?) Heroku
  # To see an updated list of tasks and descriptions: rake heroku_db_restore -T heroku_db_restore
  gem 'heroku_db_restore'

end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-byebug' # binding.pry
  gem "better_errors"
  gem 'binding_of_caller'

  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :test do
  gem 'minitest-reporters', '1.1.9'
  gem 'guard',              '2.14.1' # Rails 5 Hartl
  gem 'guard-minitest',     '2.4.6' # '2.4.4' Rails 5 Hartl
  gem 'rails-controller-testing', '1.0.2' # with Rails 5 Hartl
  # Creates /coverage/index.html which details MiniTest coverage
  gem 'simplecov', :require => false
end
 
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
