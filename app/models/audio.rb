class Audio < ApplicationRecord
  belongs_to :chapter
  has_one_attached :file
end
