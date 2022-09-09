require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module LaHistStreet
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.active_record.schema_format = :sql # https://blog.appsignal.com/2020/01/15/the-pros-and-cons-of-using-structure-sql-in-your-ruby-on-rails-application.html I think so can ignore old migrations. Now will generate config/structure.sql

    # From pre Rails 6, probably should be somewhere else or take it out and see if app works
    config.serve_static_assets = true # https://devcenter.heroku.com/articles/rails-4-asset-pipeline

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = "Pacific Time (US & Canada)" # off by default
  end
end
