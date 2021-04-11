class ApplicationController < ActionController::Base
  before_action :authenticate_user!, only: :show
  before_action :configure_permitted_parameters, if: :devise_controller?


  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    devise_parameter_sanitizer.permit(:update, keys: [:username])
  end
end
