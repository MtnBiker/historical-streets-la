ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require "minitest/reporters"
Minitest::Reporters.use!


class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all
  include ApplicationHelper # Hartl doesn't have this. Is it by default or did I put it in?

  # Returns true if a test user is logged in. Hartl Listing 8.26
  def is_logged_in?
    !session[:user_id].nil?
  end
end
