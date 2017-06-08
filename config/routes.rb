Rails.application.routes.draw do
  
  root 'static_pages#home'
  resources :streets

  get  '/home',   to: 'static_pages#home'
  get  '/contact',   to: 'static_pages#contact'
  get  '/acknowledgements',   to: 'static_pages#acknowledgements'
  get 'about' => 'static_pages#about'
  get 'acknowledgments' => 'static_pages#acknowledgments'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
