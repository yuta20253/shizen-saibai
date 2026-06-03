class Feedback < ApplicationRecord
  belongs_to :diagnosis

  validates :feedback_text, presence: true
  validates :rating, presence: true, inclusion: { in: 1..5 }
end
