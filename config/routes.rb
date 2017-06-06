Rails.application.routes.draw do
  
  devise_for :users
  # root to: 'streets#index'
  # Devise uses this
  root to: 'static_pages#home'
  
  root 'static_pages#home'
  resources :streets

  get 'static_pages/home'
  get 'static_pages/about'
  get 'static_pages/acknowledgements'
  get 'about' => 'static_pages#about'
  get 'acknowledgements' => 'static_pages#acknowledgements'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
