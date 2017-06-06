require 'test_helper'

class ApplicationHelperTest < ActionView::TestCase
  test "full title helper" do
    assert_equal full_title,         'Historical Street Names in Los Angeles'
    assert_equal full_title("About"), 'About | Historical Street Names in Los Angeles'
    assert_equal full_title("Acknowledgements"), 'Acknowledgements | Historical Street Names in Los Angeles'
  end
end