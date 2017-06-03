Rails.application.routes.draw do
  get 'static_pages/home'

  get 'static_pages/about'

  get 'static_pages/acknowledgements'

  root 'streets#index'
  resources :streets
  # get 'jqgrid'  => 'streets#jqgrid'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
