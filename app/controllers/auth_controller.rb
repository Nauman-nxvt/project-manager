class AuthController < ApplicationController
  respond_to :json
  def check_for_user
    if current_user
      respond_with json: current_user
    else
      respond_with data: nil
    end
  end
end

