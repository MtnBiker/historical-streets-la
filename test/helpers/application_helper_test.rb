require 'test_helper'

class ApplicationHelperTest < ActionView::TestCase
  test "full title helper" do
    assert_equal full_title,         'Historic Street Names in Los Angeles'
    assert_equal full_title("About"), 'About | Historic Street Names in Los Angeles'
    assert_equal full_title("Acknowledgements"), 'Acknowledgements | Historic Street Names in Los Angeles'
  end
end