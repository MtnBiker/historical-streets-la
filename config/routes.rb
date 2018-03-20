Rails.application.routes.draw do

  root 'static_pages#home'
  get 'password_resets/new'
  get 'password_resets/edit'
  get 'signup' => 'users#new'
  get 'overview', to: 'overview#index'
  resources :maps
  resources :streets
  get 'dup_street', to: 'streets#dup' # part of duplicating an entry/record from show page
  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]

  get '/home',      to: 'static_pages#home'
  get '/contact',   to: 'static_pages#contact'
  get '/acknowledgements',   to: 'static_pages#acknowledgements'
  get 'acknowledgments' => 'static_pages#acknowledgments' # missing e and is probably not needed
  get 'about' => 'static_pages#about'

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # Whats does one use in link_to to use this link, crores_path or _url doesn't work
  get 'crores', to: redirect("https://secure-shore-68966.herokuapp.com"), as: 'crores'  
  get 'twitter', to: redirect('https://twitter.com/HistStreetsLA'), as: 'twitter'        
  get 'facebook', to: redirect( 'https://www.facebook.com/Historic-Street-Names-in-Los-Angeles-1654691867902831/'), as: "facebook"
  
  get 'githublahist', to: redirect("https://github.com/MtnBiker/historical-streets-la"), as: 'githublahist'
  get "knobby", to: redirect('http://knobby.ws/'), as: 'knobby'

  # so overview.html.erb and overviewMap can find what overview.json.jbuilder created.
 get 'overview/overview_data', :defaults => { :format => 'json' } # Clark p159.
 get 'overview/segments_data', :defaults => { :format => 'json' } # Clark p159.
 
 # paper_trail
 post "versions/:id/revert" => "versions#revert", :as => "revert_version"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
