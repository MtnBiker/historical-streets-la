class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable,
         :omniauthable, :omniauth_providers => [:facebook]

# Below and line just above from https://revs.runtime-revolution.com/working-with-facebook-using-devise-omniauth-koala-and-rails-5-cde5d032de02
  def self.create_from_omniauth(params)
    user = find_or_create_by(email: params.info.email, uid: params.uid)
    user.update({
      token: params.credentials.token,
      name: params.info.name,
      avatar: params.info.image
    })
    user
  end
end
