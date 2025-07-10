require 'rails_helper'

RSpec.describe "API::V1::Users::RegistrationsController", type: :request do
  include Devise::Test::IntegrationHelpers

  before do
    sign_in user
  end

  describe "POST /api/v1/user" do
    let!(:user) { create(:user) }
    let(:auth_headers) do
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
      { "Authorization" => "Bearer #{token}" }
    end
    let(:valid_params) do
      {
        user: {
          email: "test@example.com",
          password: "password123",
          password_confirmation: "password123",
          current_password: "password",
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
          current_password: "password",
          name: ""
        }
      }
    end

    context "有効なパラメータの場合" do
      it "ユーザー登録に成功し、200とユーザーデータが返る" do
        post "/api/v1/user", params: valid_params, headers: auth_headers
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json["status"]["code"]).to eq(200)
        expect(json["user"]["name"]).to eq "Test User"
        expect(json["user"]["email"]).to eq "test@example.com"
        expect(json["user"]).to have_key("id")
      end
    end

    context "無効なパラメータの場合" do
      it "登録に失敗し422とエラーメッセージが返る" do
        post "/api/v1/user", params: invalid_params, headers: auth_headers
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["status"]["code"]).to eq(422)
        expect(json["status"]["message"]).to eq("サインアップできませんでした。")
        expect(json["status"]["errors"]).to be_an(Array)
        expect(json["status"]["errors"]).not_to be_empty
      end
    end
  end

  describe "DELETE /api/v1/user" do
    let!(:user) { create(:user) }
    let(:auth_headers) do
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
      { "Authorization" => "Bearer #{token}" }
    end
    it "ユーザーを論理削除しサインアウトする" do
      # puts user.name
      delete "/api/v1/user", headers: auth_headers
      # puts "Response status: #{response.status}"
      # puts "Response headers: #{response.headers.inspect}"
      # puts "Response body: #{response.body}"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["message"]).to eq "サインアウトができました。"

      user.reload
      expect(user.deleted_at).not_to be nil
      expect(user.email).to match(/\Adeleted_[a-z0-9]+@example.com\z/)
    end
  end
end
