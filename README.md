# README

Wiped out old rails app except folder and .gitignore
Git 3- , may have forgotten to merge
rails new la_hist_street [asked if wanted to overwrite .gitignore and I said no]
Copied over stuff to Gemfile including bundler
bundle
bundle update
database.yml to postgis
rails db:create db:migrate
added line to config/application.rb config.active_record.schema_format = :sql. should have done it before above
rails g scaffold Street prevName:string currentName:string dateEarliest:string dateLatest:string where:string  extent:line_string numBlocks:string ref1:text ref2:text ref3:text notes:text --force since I am reusing some of this rails
yarn add jquery
yarn add bootstrap
yarn add bootstrap@4.0.0-alpha.6

@bootstrap-sprockets is commented out. Should I add //= require bootstrap-sprockets to application.js to make it work?
or gem 'sprockets-rails', :require => 'sprockets/railtie'

To import csv, using right click on table streets to bring up import. Changed created_at and update_at to accept null. did not import index. Couldn't change back to null!!!
