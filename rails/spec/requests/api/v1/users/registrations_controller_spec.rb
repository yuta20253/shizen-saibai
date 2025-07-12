require 'rails_helper'

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
          name: "Test User"
        }
      }
    end
    let(:invalid_params) do
      {
        user: {
          email: "invalid-email",
          password: "pass",
          password_confirmation: "different",
          name: ""
        }
      }
    end

    context "有効なパラメータの場合" do
      it "ユーザー登録に成功し、200とユーザーデータが返る" do
        post "/api/v1/user", params: valid_params, as: :json
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json["status"]["code"]).to eq(200)
        expect(json["user"]["name"]).to eq "Test User"
        expect(json["user"]["email"]).to eq "test@example.com"
        expect(json["user"]).to have_key("id")
      end
    end

    context "emailが不正な場合" do
      it "422エラーとemailに関するバリデーションメッセージを返す" do
        post '/api/v1/user', params: {
          user: {
            email: "invalid-email",
            password: "password123",
            password_confirmation: "password123",
            name: "User"
          }
        }
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["status"]["code"]).to eq(422)
        expect(json["status"]["errors"]).to include("Eメールは不正な値です")
      end
    end

    context "passwordとpassword_confirmationが一致しない場合" do
      it "422エラーとパスワード確認不一致に関するバリデーションメッセージを返す" do
        post "/api/v1/user", params: {
          user: {
            email: "test@example.com",
            password: "password123",
            password_confirmation: "different123",
            name: "User"
          }
        }
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["status"]["code"]).to eq(422)
        expect(json["status"]["errors"]).to include("パスワード（確認用）とパスワードの入力が一致しません")
      end
    end
  end

  describe "DELETE /api/v1/user" do
    let!(:user) { create(:user) }
    before do
      sign_in user
    end

    # let(:auth_headers) do
    #   token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
    #   { "Authorization" => "Bearer #{token}" }
    # end
    it "ユーザーを論理削除しサインアウトする" do
      # puts user.name
      delete "/api/v1/user", as: :json
      # puts "Response status: #{response.status}"
      # puts "Response headers: #{response.headers.inspect}"
      # puts "Response body: #{response.body}"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["message"]).to eq "退会しました。"

      user.reload
      expect(user.deleted_at).not_to be nil
      expect(user.email).to match(/\Adeleted_[a-z0-9]+@example.com\z/)
    end
  end
end
