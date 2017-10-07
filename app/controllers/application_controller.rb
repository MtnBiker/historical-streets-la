class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper
  before_action :set_paper_trail_whodunnit

  # TODO commented out because of error, but seems like should have something like this
  # def user_for_paper_trail
  #   logged_in? ? user.id : 'Public user'  # or whatever
  # end
end
