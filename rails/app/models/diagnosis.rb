class Diagnosis < ApplicationRecord
  belongs_to :user
  belongs_to :Vegetable
  belongs_to :Weed
  belongs_to :soil
end
