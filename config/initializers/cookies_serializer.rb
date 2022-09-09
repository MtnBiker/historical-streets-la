# Be sure to restart your server when you modify this file.

# Specify a serializer for the signed and encrypted cookie jars.
# Valid options are :json, :marshal, and :hybrid.
# Rails.application.config.action_dispatch.cookies_serializer = :json
Rails.application.config.action_dispatch.cookies_serializer = :hybrid

# Default is :json, otherwise need to set and something in Hartl's keeping track of logins requires this to not be the default
