class Api::V1::BaseController < ApplicationController
  respond_to :json
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def not_found
    respond_with error: 'Record not found'
  end
end