require 'test_helper'

class StreetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @street = streets(:one)
  end

  test "should get index" do
    get streets_url
    assert_response :success
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create street" do
    assert_difference('Street.count') do
      post streets_url, params: { street: { current_name: @street.current_name, date_earliest: @street.date_earliest, date_latest: @street.date_latest, extent_json: @street.extent_json, notes: @street.notes, number_of_blocks: @street.number_of_blocks, previous_name: @street.previous_name, references: @street.references, ref1: @street.ref1, ref2: @street.ref2, ref3: @street.ref3 } }
    end

    assert_redirected_to street_url(Street.last)
  end

  test "should show street" do
    get street_url(@street)
    assert_response :success
  end

  test "should get edit" do
    get edit_street_url(@street)
    assert_response :success
  end

  test "should update street" do
    patch street_url(@street), params: { street: { current_name: @street.current_name, date_earliest: @street.date_earliest, date_latest: @street.date_latest, extent_json: @street.extent_json, notes: @street.notes, number_of_blocks: @street.number_of_blocks, previous_name: @street.previous_name, references: @street.references, ref1: @street.ref1, ref2: @street.ref2, ref3: @street.ref3 } }
    assert_redirected_to street_url(@street)
  end

  test "should destroy street" do
    assert_difference('Street.count', -1) do
      delete street_url(@street)
    end

    assert_redirected_to streets_url
  end
end
