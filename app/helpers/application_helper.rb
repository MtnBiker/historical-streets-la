module ApplicationHelper
  # Returns the full title on a per-page basis.
  # The result is that the full_title method is automagically available in all our views.
  def full_title(page_title = '')
    base_title = "Historical Street Names in Los Angeles"
    if page_title.empty?
      base_title
    else
      page_title + " | " + base_title
    end
  end
  
  # https://www.sitepoint.com/devise-authentication-in-depth/
  def header(text)
    content_for(:header) { text.to_s }
  end
  
end
