module ApplicationHelper
  # Returns the full title on a per-page basis.
  # The result is that the full_title method is automagically available in all our views.
  def full_title(page_title = '')
    base_title = "Historic Street Names in Los Angeles"
    if page_title.empty?
      base_title
    else
      page_title + " | " + base_title
    end
  end
  
end
