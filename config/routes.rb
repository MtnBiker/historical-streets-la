Rails.application.routes.draw do
  
  get 'password_resets/new'

  get 'password_resets/edit'

  get 'signup' => 'users#new'
  root 'static_pages#home'
  resources :streets
  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]

  get  '/home',   to: 'static_pages#home'
  get  '/contact',   to: 'static_pages#contact'
  get  '/acknowledgements',   to: 'static_pages#acknowledgements'
  get 'about' => 'static_pages#about'
  get 'acknowledgments' => 'static_pages#acknowledgments'
  
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
