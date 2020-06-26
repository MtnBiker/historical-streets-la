require_relative 'boot'

# require "rails" # Was in pre Rails6
require 'rails/all' # from Crores which is an older app and Agile Web Development has it, Does it replace all the stuff below, seems like it might

# Pick the frameworks you want: (none of this in crores), but was in pre Rails 6.0, but will try to comment it out and see if bundle install will go
# require "active_model/railtie"
# require "active_job/railtie"
# require "active_record/railtie"
# # require "active_storage/engine"
# require "action_controller/railtie"
# require "action_mailer/railtie"
# # require "action_mailbox/engine"
# # require "action_text/engine"
# require "action_view/railtie"
# # require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module LaHistStreet
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # From pre Rails 6
    # config.active_record.schema_format = :sql # caused an error with webpack:install
    config.serve_static_assets = true # https://devcenter.heroku.com/articles/rails-4-asset-pipeline

    config.time_zone = 'Pacific Time (US & Canada)' # from Crores5

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
