require "rails_helper"
require "devise/jwt/test_helpers"

RSpec.describe "API::V1::Users::RegistrationsController", type: :request do
  include Devise::Test::IntegrationHelpers

  before do
    I18n.locale = :ja
  end

  describe "POST /api/v1/user" do
    let!(:user) { create(:user) }
    let(:valid_params) do
      {
        user: {
          email: "test@example.com",
          password: "password123",
          password_confirmation: "password123",
          name: "Test User",
        },
      }
    end
    let(:invalid_params) do
      {
        user: {
          email: "invalid-email",
          password: "pass",
          password_confirmation: "different",
          name: "",
        },
      }
    end

    context "有効なパラメータの場合" do
      it "ユーザー登録に成功し、200とユーザーデータが返る" do
        post "/api/v1/user", params: valid_params, as: :json
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json["status"]).to eq(200)
        expect(json["user"]["name"]).to eq "Test User"
        expect(json["user"]["email"]).to eq "test@example.com"
        expect(json["user"]).to have_key("id")
      end
    end
  end

  # context "emailが不正な場合" do
  #   it "422エラーとemailに関するバリデーションメッセージを返す" do
  #     post "/api/v1/user", params: {
  #       user: {
  #         email: "invalid-email",
  #         password: "password123",
  #         password_confirmation: "password123",
  #         name: "User",
  #       },
  #     }
  #     expect(response).to have_http_status(:unprocessable_entity)
  #     json = JSON.parse(response.body)
  #     expect(json["status"]).to eq(422)
  #     expect(json["status"]["errors"]).to include("Eメールは不正な値です")
  #   end
  # end

  # context "passwordとpassword_confirmationが一致しない場合" do
  #   it "422エラーとパスワード確認不一致に関するバリデーションメッセージを返す" do
  #     post "/api/v1/user", params: {
  #       user: {
  #         email: "test@example.com",
  #         password: "password123",
  #         password_confirmation: "different123",
  #         name: "User",
  #       },
  #     }
  #     expect(response).to have_http_status(:unprocessable_entity)
  #     json = JSON.parse(response.body)
  #     expect(json["status"]).to eq(422)
  #     expect(json["status"]["errors"]).to include("パスワード（確認用）とパスワードの入力が一致しません")
  #   end
  # end

  describe "DELETE /api/v1/user" do
    let!(:user) { create(:user) }

    let(:token) do
      payload = { user_id: user.id }
      JWT.encode(payload, Rails.application.credentials.devise[:jwt_secret_key], "HS256")
    end

    let(:auth_headers) do
      { "Authorization" => "Bearer #{token}" }
    end

    it "ユーザーを論理削除しサインアウトする" do
      delete "/api/v1/user", headers: auth_headers, as: :json

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["message"]).to eq "退会処理が完了しました"

      user.reload
      expect(user.deleted_at).not_to be_nil
      expect(user.email).to match(/\Adeleted_[a-z0-9]+@example.com\z/)
    end

    it "無効なトークンでは削除されない" do
      delete "/api/v1/user", headers: { "Authorization" => "Bearer wrongtoken" }, as: :json

      expect(response).to have_http_status(:unauthorized)
      json = JSON.parse(response.body)
      expect(json["message"]).to eq "無効なトークンです"

      user.reload
      expect(user.deleted_at).to be_nil
    end
  end
end
