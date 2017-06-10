Add search for street and return to map at center of the segment

1928 Hill's needs more detailed georeferencing

Add another page with all the segments mapped. Maybe can do a SQL to find all the segments and make a JSON or maybe it happens automagically. Need  popups. 
And then have date slider.

 Error if edit from streets. Probably in the ugly decision tree. Look at gon
 
 class="container" in application.html.erb messes up streets table, even though the div is closed
 
Navbar list doesn't work right. Works OK in footer.

Section 5.3.4 testing mostly not working

Link colors have problems. Changed to teal, but that doesn't work with blue background buttons

Redo columns on Streets > Edit and Show. Worked with Bootstrap 4, but not with v3 that I've downgraded to to get Header to work right

Option to paginate. Gems are installed. Two places change. streets/users_controller.rb lines 7/8 and two erbs for pagination on streets/index.html.erb

Get rid of example user when I get myself set up on localhost

Make the signup and password reset emails and HTML a bit more professional

Look at puma.rb and see if hidden stuff is needed