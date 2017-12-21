class MapsController < ApplicationController
  before_action :set_map, only: [:show, :edit, :update, :destroy]

  # GET /maps
  # GET /maps.json
  def index
    @maps = Map.all.order(:year)
  end

  # GET /maps/1
  # GET /maps/1.json
  def show
  end

  # GET /maps/new
  def new
    @map = Map.new
  end

  # GET /maps/1/edit
  def edit
  end

  # POST /maps
  # POST /maps.json
  def create
    @map = Map.new(map_params)

    respond_to do |format|
      if @map.save
        format.html { redirect_to @map, notice: "Map was successfully created.  #{undo_link}" }
        format.json { render :show, status: :created, location: @map }
      else
        # for fixing test. from Copeland p101. Doesn't show up unless an error, so maybe leave in
        puts "X W X M W  Expanded error message: #{@map.errors.full_messages}. @map.name: #{@map.name} WWWWWW\r"
        format.html { render :new }
        format.json { render json: @map.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /maps/1
  # PATCH/PUT /maps/1.json
  def update
    respond_to do |format|
      if @map.update(map_params)
        format.html { redirect_to @map, notice: "Map was successfully updated.  #{undo_link}" }
        format.json { render :show, status: :ok, location: @map }
      else
        format.html { render :edit }
        format.json { render json: @map.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /maps/1
  # DELETE /maps/1.json
  def destroy
    @map.destroy
    respond_to do |format|
      format.html { redirect_to maps_url, notice: "Map was successfully destroyed.  #{undo_link}" }
      format.json { head :no_content }
    end
  end

  private
  
  # paper_trails
  def undo_link
    view_context.link_to("Undo", revert_version_path(@map.versions.reload.last), :method => :post)
  end
  
    # Use callbacks to share common setup or constraints between actions.
    def set_map
      @map = Map.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def map_params
      params.require(:map).permit(:name, :year, :zoom, :url, :attribLink, :attrib, :notes, :thomasGuide)
    end
end
