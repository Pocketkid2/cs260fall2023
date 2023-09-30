# Start-up: Film Hub

## Elevator Pitch

The one-stop shop for film nerds. You can find information about movies, read reviews, and even contribute your own reviews and chat with other users. You can also keep track of your favorite films, films you've watched, and films you want to see. The site will be connected to other useful sites such as Wikipedia, IMDB, RottenTomatoes, and Blu-ray.com.

## Design

### Home Page Rough Sketch

![Home Page Rough Sketch](images/StartupSketchHomePage.png)

### Search Page Rough Sketch

![Search Page Rough Sketch](images/StartupSketchSearchPage.png)

### Chat Page Rough Sketch

![Chat Page Rough Sketch](images/StartupSketchChatPage.png)

### Profile Page Rough Sketch

![Profile Page Rough Sketch](images/StartupSketchProfilePage.png)

### Login Page Rough Sketch

![Login Page Rough Sketch](images/StartupSketchLoginPage.png)

### Signup Page Rough Sketch

![Signup Page Rough Sketch](images/StartupSketchSignupPage.png)

## Key Features

### Things anybody who visits the site can do
* Search any movie and go to its page
* See general information and reviews about it on this site
* See links to additional sites with more information about that film

### Things only logged in users can do
* Chat with other users
* Score a movie
* Write a text review for a movie
* Put movies on a watchlist and favorites list

## Technologies

* HTML - Site format, navigation at the top, page layout, entry forms
* CSS - Make everything look pretty
* JavaScript - Make everything functional (forms send to database or web APIs, response is returned and posted)
* Service - Will make use of both internal DB and external web services via API (IMDB, etc)
* DB - Store user information and movie reviews
* Login - Require users to login to contribute anything
* WebSocket - For chat area (users send messages to server, which gets forwarded to everyone who has the page open
* React - Porting website to react

## Extra features if I have time and can figure it out

* When logged in, login and signup button at the top go away and are replaced with a single "signout" button
* Require users to verify their email address
* Add more things on the home page
* Integrate with more websites

## Notes for Startup HTML assignment submission

* Created the basic HTML pages and populated them with the necessary forms, and some placeholder data where database accessing will occur
* Deployed startup to startup.filmhub.click and simon (with some small modifications) to simon.filmhub.click
