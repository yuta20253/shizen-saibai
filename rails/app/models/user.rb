class User < ApplicationRecord
  # JTIMatcherを使うなら、revocation_strategyはJTIMatcherにする
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :diagnoses

  default_scope { where(deleted_at: nil) }

  validates :name, presence: true
  validates :email, presence: true,
                    uniqueness: { scope: :deleted_at, message: 'は既に登録されています' },
                    format: { with: URI::MailTo::EMAIL_REGEXP }

  # JWT認証用
  def self.find_for_jwt_authentication(sub:)
    find_by(id: sub)
  end

  def generate_masked_email
    loop do
      email = "deleted_#{SecureRandom.hex(8)}@example.com"
      break email unless User.exists?(email: email)
    end
  end

  # 論理削除＋メールマスキング
  def soft_delete!
    update!(
      deleted_at: Time.current,
      email: generate_masked_email,
      name: "********",
      encrypted_password: Devise::Encryptor.digest(self.class, SecureRandom.hex(10))
    )
  end

  # 退会ユーザーはログイン不可にする
  def active_for_authentication?
    super && deleted_at.nil?
  end
end
