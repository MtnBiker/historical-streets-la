require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  
  def setup
    @base_title = "Historical Street Names in Los Angeles"
  end
  
  test "should get root" do
    get static_pages_home_url
    assert_response :success
  end
  

  test "should get home" do
    get static_pages_home_url
    assert_response :success
    assert_select "title", "Home | #{@base_title}"
  end

  test "should get about" do
    get static_pages_about_url
    assert_response :success
    assert_select "title", "About | #{@base_title}"
  end

  test "should get acknowledgements" do
    get static_pages_acknowledgements_url
    assert_response :success
    assert_select "title", "Acknowledgements | #{@base_title}"
  end

end
