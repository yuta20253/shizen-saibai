require 'rails_helper'

RSpec.describe "Api::V1::Admin::Knowledges", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/admin/knowledges/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/admin/knowledges/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/admin/knowledges/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/admin/knowledges/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
