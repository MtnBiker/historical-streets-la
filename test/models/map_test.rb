require 'test_helper'

class MapTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  
  # model name, :year, :url exist
  test "attributes exist for model map" do
    map = Map.new
    assert map.invalid?
    assert map.errors[:name].any?
    assert map.errors[:year].any?
    assert map.errors[:url].any?
  end
  
  #following Sam Ruby-Copeland p 95
  def new_map(url)
    Map.new(name: "1866 Fred",
            year: "1866",
            url: url)
  end
  
  #  test that url starts with http
  test "url" do
    ok = %w{ https://crores.s3.amazonaws.com/tiles/1857Bancroft/{z}/{x}/{y}.png https://crores.s3.amazonaws.com/tiles/1888SanbornKM1a/{z}/{x}/{y}.png}
    bad = %w{ attps://crores.s3.amazonaws.com/tiles/1888SanbornKM1a/{z}/{x}/{y}.png crores.s3.amazonaws.com/tiles/1888SanbornKM1a/{z}/{x}/{y}.png}
    
    ok.each do |url|
      assert new_map(url).valid?, "#{url} shouldn't be invalid"
    end
    
    bad.each do |url|
      assert new_map(url).invalid?, "#{url} shouldn't be valid"
    end    
  end
  
end
