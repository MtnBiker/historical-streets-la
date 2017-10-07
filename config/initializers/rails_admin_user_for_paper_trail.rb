ApplicationController.module_eval do
  def user_for_paper_trail
    _current_user.try(:id) || _current_user
  end
end

# https://stackoverflow.com/questions/28588690/display-custom-label-for-user-in-rails-admin-paper-trail-history
# Test not sure this is needed