class OverviewController < ApplicationController
  # before_action :set_overview, only: [:show, :edit, :update, :destroy] # doesn't seem to affect what I'm trying to do. Delete

  def index
  end

  def overview_data
    # @segments = Street.select("dateEarliest, prevName, dateLatest, currentName, extent_json")
    @segments = Street.all # produces json. SQL via console: SELECT "streets".* FROM "streets"
  end
  
  # def all_data # maybe for export. Also looked at to start from scratch with jBuilder
 #    @segments = Street.all
 #  end
  
  # Outlining a way to massage the data as it is being created.
  # def segments_json
 #    # theData will be all the features that have a extent_json.
 #    theData = ""
 #
 #
 #    # Loop through the database streets include title and extent_json with
 #    Street.each do |street| # CORRECTLY FORM THIS
 #      if (street.extent_json)
 #        # How escape " so they show up as " and not \"
 #        preFix = '"features":[{
 #            "type":"Feature",
 #            "properties":{"title":'
 #        midFix =  '},
 #        "geometry": {'
 #
 #          postFix = '},'
 #
 #          theData =+ preFix + street.title + midFix + street.extent.json + postFix
 #      end # if
 #    end # do
 #
 #    segments_data = '{type:"FeatureCollection",' + theData + "}," # may have to strip the last ,
 #
 #  end

  private

  # def set_overview
  #   # @street = Street.find(params[:id])
  # end
end
