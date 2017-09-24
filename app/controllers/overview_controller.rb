class OverviewController < ApplicationController
  # layout "overview"

  def index
  end

  def show
    @maps = Map.all.order(:year)
    @users = User.all
    gon.streetExtentArray = @street.extent_array
  end

  def overview_data
    @segments = Street.select("dateEarliest, prevName, dateLatest, currentName")
  end
end
