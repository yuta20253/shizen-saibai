class API::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: resource.slice(:id, :email, :name)
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "User couldn't be created successfully.", errors: resource.errors.full_messages }
      }, status: :unprocessable_entity
    end
  end
end
