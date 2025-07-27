require 'swagger_helper'

RSpec.describe 'Api::V1::Users::Sessions', type: :request do
  path '/api/v1/login' do
    post 'ユーザーのログイン' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :credentials, in: :body, schema: {
        type: :object,
        required: ['email', 'password'],
        properties: {
          email: { type: :string, example: 'test@example.com' },
          password: { type: :string, example: 'password123' },
        }
      }

      response '200', 'ログイン成功' do
        schema type: :object,
          properties: {
            status: { type: :integer, example: 200 },
            message: { type: :string, example: 'ログインに成功しました' },
            user: {
              type: :object,
              required: ['id, email', 'name'],
              properties: {
                id: { type: :integer, example: 1 },
                email: { type: :string, example: 'test@example.com' },
                name: { type: :string, example: 'テストユーザー' }
              }
            }
          }
        let!(:user) { User.create(email: 'test@example.com', password: 'password123', name: 'テストユーザー') }
        let(:credentials) { { email: user.email, password: 'password123' } }

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
        let(:credentials) { { email: 'wrong@example.com', password: 'wrongpass' } }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(response.status).to eq(401)
          expect(data['message']).to eq('メールアドレスか、パスワードが不正です')
        end
      end
    end
  end
end
