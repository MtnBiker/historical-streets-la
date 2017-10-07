Rails.application.routes.draw do

  root 'static_pages#home'
  get 'password_resets/new'

  get 'password_resets/edit'

  get 'signup' => 'users#new'
  # resources :overview
  get 'overview', to: 'overview#index' # above doesn't work
  resources :maps
  resources :streets
  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]

  get '/home',      to: 'static_pages#home'
  get '/contact',   to: 'static_pages#contact'
  get '/acknowledgements',   to: 'static_pages#acknowledgements' # Redundant TODO ?
  get 'acknowledgments' => 'static_pages#acknowledgments'
  get 'about' => 'static_pages#about'

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # Whats does one use in link_to to use this link, crores_path or _url doesn't work
  get 'crores' => redirect("https://secure-shore-68966.herokuapp.com")

  # so overview.html.erb and overviewMap can find what overview.json.jbuilder created.
 get 'overview/overview_data', :defaults => { :format => 'json' } # Clark p159.
 get 'overview/segments_data', :defaults => { :format => 'json' } # Clark p159.
 
 # paper_trail
 post "versions/:id/revert" => "versions#revert", :as => "revert_version"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
