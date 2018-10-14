class Task < ApplicationRecord
  belongs_to :project

  enum status: %i[pending in_progress done]
end
