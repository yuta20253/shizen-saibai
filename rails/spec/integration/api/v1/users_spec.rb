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

        run_test!
      end

      response '401', '未認証' do
        let(:Authorization) { nil }
        run_test!
      end
    end
  end
end
