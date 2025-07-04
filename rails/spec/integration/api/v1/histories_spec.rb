require 'swagger_helper'
RSpec.describe 'API::V1::Histories', type: :request do
  path '/api/v1/histories' do
    get '診断履歴一覧を取得' do
      tags 'Histories'
      produces 'application/json'
      security [ bearerAuth: [] ] # JWT 認証が必要なら

      response '200', '成功' do
        let(:user){ create(:user) }

        let(:Authorization) do
          token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
          "Bearer #{token}"
        end
        run_test!
      end
    end
  end
end
