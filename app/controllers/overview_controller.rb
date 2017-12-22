class OverviewController < ApplicationController
  # before_action :set_overview, only: [:show, :edit, :update, :destroy] # doesn't seem to affect what I'm trying to do. Delete

  def index
    @maps = Map.all.order(:year) # so can be used by overlaymap_selector
  end

  def overview_data
    # @segments = Street.select("dateEarliest, prevName, dateLatest, currentName, extent_json")
    @segments = Street.all # produces json. SQL via console: SELECT "streets".* FROM "streets"
  end
  
  def all_data # maybe for export. Also looked at to start from scratch with jBuilder
    @streets_data_dump = Street.all
  end
  
 
  private

  # def set_overview
  #   # @street = Street.find(params[:id])
  # end
end
