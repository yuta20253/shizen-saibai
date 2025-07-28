Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  # Defines the root path route ("/")

  get "/", to: "health_check#index"
  namespace :api do
    namespace :v1 do
      devise_for :users,
      path: "",
      controllers: {
        sessions: "api/v1/users/sessions",
        registrations: "api/v1/users/registrations",
      },
      path_names: {
        sign_in: "login",
        sign_out: "logout",
        registration: "user"
      }
      post 'password/reset', to: 'users/passwords#reset'
      patch 'password/update', to: 'users/passwords#update'

      resource :user, only: [:update], controller: :'users'
      # 診断履歴（マイページ）
      resources :histories, only: [:index, :show]
      # 画像アップロード・診断結果（雑草→土壌→野菜）
      resource :diagnosis, only: [:create]
      # 野菜詳細情報
      resources :vegetables, only: [:show]
      # 管理者用：知識ベース管理
      # namespace :admin do
      #   resources :knowledges, only: [:index, :create, :update, :destroy]
      # end
      resources :chats, only: [:create]
    end
  end
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
end
