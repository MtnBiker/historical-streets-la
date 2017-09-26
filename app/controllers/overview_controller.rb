class OverviewController < ApplicationController
  # layout "overview"
  # before_action :set_overview, only: [:show, :edit, :update, :destroy]

  def index
  end

  def overview_data
    # @segments = Street.select("dateEarliest, prevName, dateLatest, currentName, extent_array")
    @segments = Street.all # SWAG again
  end

  private

  # def set_overview
  #   # @street = Street.find(params[:id])
  # end
end
