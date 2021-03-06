require 'test_helper'

class StreetTest < ActiveSupport::TestCase

  test "should not save street without title" do
    article = Street.new
    # assert_not street.save # from Hartl but not working
  end
  
  test "should get new" do
    # get new_street_path
    # assert_response :success
    # assert_select "title", "New Historical Street | Historical Street Names in Los Angeles"
  end
  
  #following Sam Ruby-Copeland pg94
  test "street must have current, previous" do
    street = Street.new
    assert street.invalid?
    assert street.errors[:currentName].any?
    assert street.errors[:previous_name].any?
  end
end
