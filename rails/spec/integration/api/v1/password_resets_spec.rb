require 'swagger_helper'

RSpec.describe 'Api::V1::PasswordResets', type: :request, swagger_doc: 'v1/swagger.yaml' do
  path '/api/v1/password/reset/request' do
    post 'パスワード変更メール' do
      tags 'PasswordResets'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :payload, in: :body, schema: {
        type: :object,
        required: ['email'],
        properties: {
          email: { type: :string, format: :email, example: 'user@example.com' }
        }
      }

      response '200', 'リセットメール送信成功' do
        schema type: :object, properties: {
          message: { type: :string, example: 'ご入力のメールアドレス宛に、パスワード再設定用のリンクを送信しました。' }
        },
        required: ['message']
        let(:user) { create(:user, email: 'user@example.com') }
        let(:payload) { { email: user.email } }

        examples = {
          success: {
            summary: 'メールアドレスが存在する場合',
            value: { message: 'ご入力のメールアドレス宛に、パスワード再設定用のリンクを送信しました。' }
          },
          failure: {
            summary: 'メールアドレスが存在しない場合（セキュリティのため成功扱い）',
            value: { message: 'ご入力のメールアドレス宛に、パスワード再設定用のリンクを送信しました。' }
          }
        }

        run_test! do |response|
          body = JSON.parse(response.body)
          expect(body['message']).to eq('ご入力のメールアドレス宛に、パスワード再設定用のリンクを送信しました。')
        end
      end
    end
  end

  path '/api/v1/password/verify' do
    post 'トークン&メールアドレスチェック' do
      tags 'EmailVerify'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :payload, in: :body, schema: {
        type: :object,
        required: ['email', 'token'],
        properties: {
          email: { type: :string, format: :email, example: 'user@example.com' },
          token: { type: :string, example: 'abc123reset_token_here' }
        }
      }

      response '200', '有効なトークン' do
        schema type: :object, properties: {
          message: { type: :string, example: 'トークンは有効です。' }
        }

        let(:user) { create(:user, email: 'user@example.com') }
        let(:token) { user.send(:set_reset_password_token) }
        let(:payload) { { email: user.email, token: token } }
        run_test!
      end

      response '401', '無効なトークンor期限切れ' do
        schema type: :object, properties: {
          message: { type: :string, example: '無効なトークンです' }
        }

        let(:user) { create(:user, email: 'user@example.com') }
        let(:token) { user.send(:set_reset_password_token) }

        let(:payload) { { email: user.email, token: 'invalid_token' } }
        run_test!
      end

      response '401', 'トークンが空' do
        schema type: :object, properties: {
          message: { type: :string, example: '無効なトークンです' }
        }

        let(:user) { create(:user, email: 'user@example.com') }
        let(:payload) { { email: user.email, token: '' } }

        run_test!
      end

      response '404', 'ユーザーが存在しない' do
        schema type: :object, properties: {
          message: { type: :string, example: 'ユーザーが見つかりません。' }
        }

        let(:notfound_email) { 'notfound@example.com' }
        let(:invalid_token) { 'invalid_token' }
        let(:payload) { { email: notfound_email, token: invalid_token } }
        run_test!
      end
    end
  end

  path '/api/v1/password/reset' do
    patch 'パスワード更新' do
      tags 'PasswordUpdate'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :payload, in: :body, schema: {
        type: :object,
        required: ['email', 'token', 'password', 'password_confirmation'],
        properties: {
          email: { type: :string, format: :email, example: 'user@example.com' },
          token: { type: :string, example: 'abc123reset_token_here' },
          password: { type: :string, example: 'password123' },
          password_confirmation: { type: :string, example: 'password123' }
        }
      }

      response '200', 'パスワードを更新成功' do
        schema type: :object, properties: {
          message: { type: :string, example: "パスワードを更新しました。" }
        }

        let(:user) { create(:user, email: 'user@example.com') }
        let(:token) { user.send(:set_reset_password_token) }

        let(:valid_password) { 'password123' }

        let(:payload){ { email: user.email, token: token, password: valid_password, password_confirmation: valid_password } }
        run_test!
      end

      response '401', '無効なトークンor期限切れ' do
        schema type: :object, properties: {
          message: { type: :string, example: '無効なトークンです' }
        }

        let(:user) { create(:user, email: 'user@example.com') }
        let(:invalid_token) { 'invalid_token' }
        let(:valid_password) { 'password123' }

        let(:payload) { { email: user.email, token: invalid_token, password: valid_password, password_confirmation: valid_password } }
        run_test!
      end

      response '404', 'ユーザーが存在しない' do
        schema type: :object, properties: {
          message: { type: :string, example: 'ユーザーが見つかりません。' }
        }

        let(:invalid_token) { 'invalid_token' }
        let(:valid_password) { 'password123' }
        let(:payload) { { email: 'notfound@example.com', token: invalid_token, password: valid_password, password_confirmation: valid_password } }
        run_test!
      end

      response '422', 'パスワードが一致しない場合' do
        schema type: :object, properties: {
          message: { type: :string, example: 'パスワードが一致しません。' }
        }

        let(:user) { create(:user, email: 'user@example.com') }
        let(:token) { user.send(:set_reset_password_token) }
        let(:payload) do
          {
            email: user.email,
            token: token,
            password: 'password123',
            password_confirmation: 'wrongpassword'
          }
        end

        run_test!
      end

      response '422', 'パスワードが空白' do
        schema type: :object, properties: {
          message: { type: :string, example: 'パスワードと確認用パスワードを入力してください。' }
        }

        let(:user) { create(:user, email: 'user@example.com') }
        let(:token) { user.send(:set_reset_password_token) }
        let(:payload) do
          {
            email: user.email,
            token: token,
            password: '',
            password_confirmation: ''
          }
        end

        run_test!
      end
    end
  end
end
