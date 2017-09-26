class OverviewController < ApplicationController
  # before_action :set_overview, only: [:show, :edit, :update, :destroy] # doesn't seem to affect what I'm trying to do. Delete

  def index
  end

  def overview_data
    # @segments = Street.select("dateEarliest, prevName, dateLatest, currentName, extent_array")
    @segments = Street.all # produces json. SQL via console: SELECT "streets".* FROM "streets"
  end

  private

  # def set_overview
  #   # @street = Street.find(params[:id])
  # end
end
