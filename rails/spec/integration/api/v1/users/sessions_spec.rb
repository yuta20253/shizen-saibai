require 'swagger_helper'

RSpec.describe 'Api::V1::Users::Sessions', type: :request do
  path '/api/v1/login' do
    post 'ユーザーのログイン' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'

      # parameter name: :user, in: :body, schema: {
      #   type: :object,
      #   required: ['email', 'password'],
      #   properties: {
      #     email: { type: :string, example: 'test@example.com' },
      #     password: { type: :string, example: 'password123' },
      #   }
      # }
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            required: ['email', 'password'],
            properties: {
              email: { type: :string, example: 'test@example.com' },
              password: { type: :string, example: 'password123' }
            }
          }
        }
      }

      response '200', 'ログイン成功' do
        schema type: :object,
          properties: {
            status: { type: :integer, example: 200 },
            message: { type: :string, example: 'ログインに成功しました' },
            user: {
              type: :object,
              required: ['id', 'email', 'name'],
              properties: {
                id: { type: :integer, example: 1 },
                email: { type: :string, example: 'test@example.com' },
                name: { type: :string, example: 'テストユーザー' }
              }
            }
          }
        let!(:existing_user) { User.create(email: 'test@example.com', password: 'password123', name: 'テストユーザー') }
        let(:user) { { user: { email: existing_user.email, password: 'password123' } } }
        let(:Host) { 'www.example.com' }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(response.status).to eq(200)
          expect(data['message']).to eq('ログインに成功しました')
        end
      end

      response '401', 'ログイン失敗（認証エラー）' do
        schema type: :object,
          properties: {
            status: { type: :integer, example: 401 },
            message: { type: :string, example: 'メールアドレスか、パスワードが不正です' },
          }
        let(:user) { { user: { email: 'wrong@example.com', password: 'wrongpass' } } }
        let(:Host) { 'www.example.com' }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(response.status).to eq(401)
          expect(data['message']).to eq('メールアドレスか、パスワードが不正です')
        end
      end
    end
  end

  path '/api/v1/logout' do
    delete 'ユーザーのログアウト' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'

      parameter name: 'Authorization', in: :header, type: :string, description: 'Bearer token'

      response '200', 'ログアウト成功' do
        schema type: :object,
          properties: {
            status: { type: :integer, example: 200 },
            message: { type: :string, example: 'ログアウトに成功しました' }
          }
        let!(:existing_user) { User.create(email: 'test@example.com', password: 'password123', name: 'テストユーザー') }
        let(:token) { User::LoginService.new(email: existing_user[:email], password: 'password123').call[:token] }
        let(:Authorization) { "Bearer #{token}" }
        let(:Host) { 'www.example.com' }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(response.status).to eq(200)
          expect(data['message']).to eq('ログアウトに成功しました')
        end
      end
      response '401', 'Authorizationヘッダーなし' do
        let(:Authorization) { nil }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(response.status).to eq(401)
          expect(data['error']).to eq('Authorizationヘッダーがありません')
        end
      end

      response '401', '無効なトークン' do
        let(:Authorization) { 'Bearer invalid.token.here' }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(response.status).to eq(401)
          expect(data['error']).to eq('無効なトークンです')
        end
      end
      response '401', '有効期限切れトークン' do
        let!(:existing_user) do
          User.create!(email: 'test2@example.com', password: 'password123', name: 'テストユーザー2')
        end

        let(:expired_token) do
          payload = {
            user_id: existing_user.id,
            exp: 1.hour.ago.to_i, # 期限切れ
            jti: SecureRandom.uuid
          }
          JWT.encode(payload, Rails.application.credentials.devise[:jwt_secret_key], 'HS256')
        end

        let(:Authorization) { "Bearer #{expired_token}" }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(response.status).to eq(401)
          expect(data['error']).to eq('トークンの有効期限が切れています')
        end
      end
    end
  end
end
