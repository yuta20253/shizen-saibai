class Diagnosis < ApplicationRecord
  belongs_to :user
  belongs_to :vegetable
  belongs_to :weed
  belongs_to :soil
end
