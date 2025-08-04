require "rails_helper"

RSpec.describe "Api::V1::Histories", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/histories/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/histories/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/histories/create"
      expect(response).to have_http_status(:success)
    end
  end
end
