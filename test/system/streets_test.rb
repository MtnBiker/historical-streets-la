require "application_system_test_case"

class StreetsTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit streets_url

    assert_selector "h1", text: "Historical Street Names in Los Angeles"
  end
end
