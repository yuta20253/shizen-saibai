require 'swagger_helper'

RSpec.describe 'Api::V1::Users (Profile)', type: :request, swagger_doc: 'v1/swagger.yaml' do
  path '/api/v1/profile' do
    get 'プロフィール取得' do
      tags 'Profile'
      description 'ログイン中のユーザー情報（プロフィール）を取得します。'
      operationId 'getProfile'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :Authorization, in: :header, schema: { type: :string }, description: 'Bearer token'

      response '200', 'プロフィールの取得成功' do
        schema '$ref' => '#/components/schemas/User'

        let(:Host) { 'www.example.com' }

        let(:user) { create(:user, email: 'user@example.com', password: 'password123', name: 'ユーザー太朗') }

        let(:token) { User::LoginService.new(email: user.email, password: 'password123').call[:token] }
        let(:Authorization) { "Bearer #{token}" }

        run_test! do |response|
          body = JSON.parse(response.body)

          expect(body['id']).to eq(user.id)
          expect(body['name']).to eq(user.name)
          expect(body['email']).to eq(user.email)
          expect(body['role']).to be_a(Integer)
        end
      end

      response '401', '未認証' do
        let(:Authorization) { nil }
        run_test!
      end
    end

    patch 'プロフィール更新' do
      tags 'Profile'
      description 'current_password を含めてプロフィールを更新する'
      operationId 'updateProfile'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :Authorization, in: :header, schema: { type: :string }, description: 'Bearer token'
      parameter name: :payload, in: :body, schema: {
        type: :object,
        required: %w[user],
        properties: {
          user: {
            type: :object,
            properties: {
              name: { type: :string, example: '新しいユーザー名' },
              email: { type: :string, format: :email, example: 'new@example.com' },
              password: { type: :string, example: 'new_password_123' },
              password_confirmation: { type: :string, example: 'new_password_123' },
              current_password: { type: :string, example: 'current_password_123' },
            },
          },
        },
      }

      response '200', '更新成功' do
        schema type: :object, required: %w[message user], properties: {
          message: { type: :string, example: 'プロフィールを更新しました' },
          user: { '$ref' => '#/components/schemas/User' },
        }

        let(:Host) { 'www.example.com' }

        let(:user) { create(:user, email: 'user@example.com', password: 'password123', name: 'ユーザー太朗') }

        let(:token) { User::LoginService.new(email: user.email, password: 'password123').call[:token] }
        let(:Authorization) { "Bearer #{token}" }

        let(:payload) do
          {
            user: {
              name: '新しい名前',
              email: 'new@example.com',
              password: 'new_password_123',
              password_confirmation: 'new_password_123',
              current_password: 'password123',
            },
          }
        end

        run_test! do |response|
          body = JSON.parse(response.body)
          expect(body['message']).to eq('個人情報を更新しました！')
          expect(body['user']).to include(
            'id' => user.id,
            'name' => '新しい名前',
            'email' => 'new@example.com',
          )
          expect(body['user']['role']).to be_a(Integer)
        end
      end

      response '422', '現在のパスワードが異なる時にエラーになる' do
        schema type: :object, required: %w[errors], properties: {
          errors: { type: :array, items: { type: :string } },
        }

        let(:Host) { 'www.example.com' }

        let(:user) { create(:user, email: 'user@example.com', password: 'password123', name: 'ユーザー太朗') }

        let(:token) { User::LoginService.new(email: user.email, password: 'password123').call[:token] }
        let(:Authorization) { "Bearer #{token}" }

        let(:payload) do
          {
            user: {
              name: '新しい名前',
              email: 'new@example.com',
              password: 'new_password_123',
              password_confirmation: 'new_password_123',
              current_password: 'wrong_password',
            },
          }
        end

        run_test! do |response|
          body = JSON.parse(response.body)
          expect(body['errors']).to be_an(Array)
          expect(body['errors']).not_to be_empty
        end
      end

      response '422', 'パスワード再確認がパスワードと異なる時にエラーになる' do
        schema type: :object, required: %w[errors], properties: {
          errors: { type: :array, items: { type: :string } },
        }

        let(:Host) { 'www.example.com' }

        let(:user) { create(:user, email: 'user@example.com', password: 'password123', name: 'ユーザー太朗') }

        let(:token) { User::LoginService.new(email: user.email, password: 'password123').call[:token] }
        let(:Authorization) { "Bearer #{token}" }

        let(:payload) do
          {
            user: {
              name: '新しい名前',
              email: 'new@example.com',
              password: 'new_password_123',
              password_confirmation: 'mismatch_password',
              current_password: 'password123',
            },
          }
        end

        run_test! do |response|
          body = JSON.parse(response.body)
          expect(body['errors']).to be_an(Array)
          expect(body['errors']).not_to be_empty
        end
      end

      response '422', 'メールアドレスの形式が異なる時にエラーになる' do
        schema type: :object, required: %w[errors], properties: {
          errors: { type: :array, items: { type: :string } },
        }

        let(:Host) { 'www.example.com' }

        let(:user) { create(:user, email: 'user@example.com', password: 'password123', name: 'ユーザー太朗') }

        let(:token) { User::LoginService.new(email: user.email, password: 'password123').call[:token] }
        let(:Authorization) { "Bearer #{token}" }

        let(:payload) do
          {
            user: {
              name: '新しい名前',
              email: 'wrong_format',
              password: 'new_password_123',
              password_confirmation: 'new_password_123',
              current_password: 'password123',
            },
          }
        end

        run_test! do |response|
          body = JSON.parse(response.body)
          expect(body['errors']).to be_an(Array)
          expect(body['errors']).not_to be_empty
        end
      end

      response '401', '未認証' do
        let(:Authorization) { nil }
        let(:payload) { { user: { name: 'だれ' } } }
        run_test!
      end
    end
  end
end
