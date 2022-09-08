require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module LaHistStreet
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
    
    # From pre Rails 6
    config.serve_static_assets = true # https://devcenter.heroku.com/articles/rails-4-asset-pipeline

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = 'Pacific Time (US & Canada)' # from Crores5 commented out by default
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
