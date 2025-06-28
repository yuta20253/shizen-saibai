FactoryBot.define do
  factory :user do
    name { "テストユーザー" }
    role { 0 }
    jti { SecureRandom.uuid }
    email { Faker::Internet.unique.email }
    password { "password" }
    confirmed_at { Time.current }        # confirmable対応
    confirmation_sent_at { Time.current }
    unconfirmed_email { nil }            # メール変更保留用。不要ならnilでOK
  end
end
