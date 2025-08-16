require 'swagger_helper'

RSpec.describe "Api::V1::Users::Registration", type: :request do
  path '/api/v1/user' do
    post 'ユーザーのサインアップ' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'

      # parameter name: :user, in: :body, schema: {
      #   type: :object,
      #   required: ['email', 'password', 'password_confirmation', 'name'],
      #   properties: {
      #     email: { type: :string, example: 'test@example.com' },
      #     password: { type: :string, example: 'password123' },
      #     password_confirmation: { type: :string, example: 'password123' },
      #     name: { type: :string, example: 'test' }
      #   }
      # }
      parameter name: :user, in: :body, schema: {
        type: :object,
        required: ['user'],
        properties: {
          user: {
            type: :object,
            required: ['email', 'password', 'password_confirmation', 'name'],
            properties: {
              email: { type: :string, example: 'test@example.com' },
              password: { type: :string, example: 'password123' },
              password_confirmation: { type: :string, example: 'password123' },
              name: { type: :string, example: 'test' }
            }
          }
        }
      }


      response '200', 'サインアップ成功' do
        schema type: :object,
        properties: {
          status: { type: :integer, example: 200 },
          message: { type: :string, example: 'サインアップに成功しました' },
          user: {
            type: :object,
            required: ['id', 'email', 'name'],
            properties: {
              id: { type: :integer, example: 1 },
              email: { type: :string, example: 'test@example.com' },
              name: { type: :string, example: 'test' }
            }
          }
        }
        let(:user) { { user: { email: 'new_email@example.com', password: 'password123', password_confirmation: 'password123', name: 'test' } } }
        run_test!
      end

      response '422', 'サインアップ失敗' do
        schema type: :object,
        properties: {
          status: { type: :integer, example: 422 },
          message: { type: :string, example: 'サインアップに失敗しました' },
          errors: {
            type: :array,
            items: { type: :string }
          }
        }
        let(:user) { { user: { email: 'test@example.com', password: 'password123', password_confirmation: 'aaa', name: 'test' } } }
        run_test!
      end
    end
  end
end
