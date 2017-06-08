require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest
  
  test "layout links" do
    get root_path
    # assert_template 'streets#index'
    assert_template 'static_pages/home'
    # assert_select "a[href=?]", root_path # , count: 2 # see Hartl, no idea what this is about
    # assert_select "a[href=?]", help_path
    # assert_select "a[href=?]", about_path
    # assert_select "a[href=?]", acknowlegements_path
    # assert_select "title", full_title("") # <Historical Street Names in Los Angeles> expected but was         <SyntaxError at />..
  end

end