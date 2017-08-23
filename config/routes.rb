Rails.application.routes.draw do
  
  resources :maps
  get 'password_resets/new'

  get 'password_resets/edit'

  get 'signup' => 'users#new'
  get 'map'=> 'streets#big_map'
  root 'static_pages#home'
  resources :streets
  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]

  get '/home',      to: 'static_pages#home'
  get '/contact',   to: 'static_pages#contact'
  get '/acknowledgements',   to: 'static_pages#acknowledgements'
  get 'about' => 'static_pages#about'
  get 'acknowledgments' => 'static_pages#acknowledgments'

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # Whats does one use in link_to to use this link, crores_path or _url doesn't work
  get 'crores' => redirect("https://secure-shore-68966.herokuapp.com")

  # so big_map.html.erb and indexMap can find what index_data.json.jbuilder created
 get 'street/index_data', :defaults => { :format => 'json' }
 get 'map/index_data', :defaults => { :format => 'json' } # this is probably not needed. Added as a test TODO
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
