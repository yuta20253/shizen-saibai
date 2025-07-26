require 'swagger_helper'

RSpec.describe "Api::V1::Users::Registration", type: :request do
  path '/api/v1/user' do
    post 'ユーザーのサインアップ' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :credentials, in: :body, schema: {
        type: :object,
        required: ['email', 'password', 'password_confirmation', 'name'],
        properties: {
          email: { type: :string, example: 'test@example.com' },
          password: { type: :string, example: 'password123' },
          password_confirmation: { type: :string, example: 'password123' },
          name: { type: :string, example: 'test'}
        }
      }

      response '200', 'サインアップ成功' do
        schema type: :object,
        properties: {
          status: { type: :integer, example: 200 },
          message: { type: :string, example: 'サインアップに成功しました' },
          user: {
            type: :object,
            properties: {
              id: { type: :integer, example: 1 },
              email: { type: :string, example: 'test@example.com' },
              name: { type: :string, example: 'test' }
            }
          }
        }
        let(:credentials) { { email: 'test@example.com', password: 'password123', password_confirmation: 'password123' } }

        run_test!
      end

      response '422', 'サインアップ失敗' do
        schema type: :object,
        properties: {
          status: { type: :integer, example: 422 },
          message: { type: :string, example: 'サインアップできませんでした。' },
          errors: {
            type: :array,
            items: { type: :string }
          }
        }
        let(:credentials) { { email: 'test@example.com', password: 'password123', password_confirmation: 'aaa' } }
        run_test!
      end
    end
  end
end
