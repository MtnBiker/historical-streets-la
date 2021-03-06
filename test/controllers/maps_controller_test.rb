require 'test_helper'

class MapsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @map = maps(:one)
    @name = "The map name #{rand(1000)}" # Needed to prevent error at should_create_map due to uniquenss. From Copeland p102.
    # making the names unique in maps.yml didn't help
  end

  test "should get index" do
    get maps_url
    assert_response :success
  end

  test "should get new" do
    get new_map_url
    assert_response :success
  end

  test "should create map" do
    assert_difference('Map.count') do
      post maps_url, params: {
         map: {
            attrib: @map.attrib,
            attribLink: @map.attribLink,
            name: @name, # Changed from default Copeland p102
            server_url: @map.server_url,
            source_url: @map.source_url,
            year: @map.year
         }
      }
    end

    assert_redirected_to map_url(Map.last)
  end

  test "should show map" do
    get map_url(@map)
    assert_response :success
  end

  test "should get edit" do
    get edit_map_url(@map)
    assert_response :success
  end

  test "should update map" do
    patch map_url(@map), params: { map: { attrib: @map.attrib, attribLink: @map.attribLink, name: @map.name, server_url: @map.server_url, source_url: @map.source_url, year: @map.year } }
    assert_redirected_to map_url(@map)
  end

  test "should destroy map" do
    assert_difference('Map.count', -1) do
      delete map_url(@map)
    end

    assert_redirected_to maps_url
  end
end
