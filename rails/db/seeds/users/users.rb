require 'devise'

User.create!(
  name: '長澤 まさみ',
  email: 'masami@example.com',
  role: 0,
  jti: SecureRandom.uuid,
  password: 'password123',
  password_confirmation: 'password123',
  confirmed_at: Time.current
)

User.create!(
  name: '鈴木 亮平',
  email: 'suzuki@example.com',
  role: 0,
  jti: SecureRandom.uuid,
  password: 'secret456',
  password_confirmation: 'secret456',
  confirmed_at: Time.current
)
