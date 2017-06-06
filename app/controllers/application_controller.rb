class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  # All below is Devise https://www.sitepoint.com/devise-authentication-in-depth/
  # TODO Below stopping page from loading
  # before_action :configure_permitted_parameters, if: :devise_controller?
  #
  # protected
  #
  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.for(:sign_up) << :name
  #   devise_parameter_sanitizer.for(:account_update) << :name
  # end
  
  # Similar from https://github.com/plataformatec/devise#getting-started
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
  
  
end
