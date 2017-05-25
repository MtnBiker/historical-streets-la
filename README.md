# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
added some gems
bundle

https://stark-cove-20051.herokuapp.com/ | https://git.heroku.com/stark-cove-20051.git
https://github.com/MtnBiker/historical-streets-la.git
rake db:create 
OR SCAFFOLD BELOW??
rails g migration Streets prevName:string currentName:string dateEarliest:date dateLatest:date (deal with before or after) extend:geom? numBlocks:string ref1:text ref2:text ref3:text notes:text

Date: Earliest is earliest known as that name, Latest is latest known as that date, could be called 
numBlocks: approx number of blocks affected or length if can calculate

create_table :my_spatial_table do |t|
  t.column :shape1, :geometry // equivalent to the line below
  t.geometry :shape2
  t.line_string :path, srid: 3785
  t.st_point :lonlat, geographic: true
  t.st_point :lonlatheight, geographic: true, has_z: true
end

t.index :lonlat, using: :gist ?? gist