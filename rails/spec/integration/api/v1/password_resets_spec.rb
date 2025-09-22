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
end
