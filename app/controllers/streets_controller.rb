class StreetsController < ApplicationController
  before_action :set_street, only: [:show, :edit, :update, :destroy]

  # using a before_action callback (just as you did with set_street ) if you plan to access @maps from more action TODO https://stackoverflow.com/questions/44790845/display-data-from-unrelated-table-model-in-rails

  # GET /streets
  # GET /streets.json
  def index
    @streets = Street.all # Without pagination. Added Listing 10.46
    # @streets = Street.paginate(page: params[:page]) # With pagination
  end

  # GET /streets/1
  # GET /streets/1.json
  def show
    @maps = Map.all.order(:year)
    @users = User.all
    gon.streetExtentArray = @street.extent_array
  end

  # GET /streets/new
  def new
    @street = Street.new
    gon.streetExtentArray = @street.extent_array
    @maps = Map.all.order(:year) # Needed for streets/new.
  end

  # GET /streets/1/edit
  def edit
    @maps = Map.all.order(:year)
    gon.streetExtentArray = @street.extent_array
  end

  # POST /streets
  # POST /streets.json
  def create
    @street = Street.new(street_params)

    respond_to do |format|
      if @street.save
        format.html { redirect_to @street, notice: 'Street was successfully created.' }
        format.json { render :show, status: :created, location: @street }
      else
        format.html { render :new }
        format.json { render json: @street.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /streets/1
  # PATCH/PUT /streets/1.json
  def update
    respond_to do |format|
      if @street.update(street_params)
        format.html { redirect_to @street, notice: 'Street was successfully updated.' }
        format.json { render :show, status: :ok, location: @street }
      else
        format.html { render :edit }
        format.json { render json: @street.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /streets/1
  # DELETE /streets/1.json
  def destroy
    @street.destroy
    respond_to do |format|
      format.html { redirect_to streets_url, notice: 'Street was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_street
      @street = Street.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def street_params
      params.require(:street).permit(:prevName, :currentName, :dateEarliest, :dateLatest, :where, :extent_json, :extent, :extent_array, :numBlocks, :ref1, :ref2, :ref3, :notes)
    end
end
