class Api::V1::BaseController < ApplicationController
  include ApiV1UserHelpers
  before_action :authenticate_user!
end
