# This file is used by Rack-based servers to start the application.

# From crores5 which is running Rails 6. Added because saw this in the listing when trying `rs`
require ::File.expand_path('../config/environment', __FILE__)

# Was
# require_relative 'config/environment'

run Rails.application
