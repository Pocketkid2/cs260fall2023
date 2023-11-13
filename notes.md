# Notes

### Assignment: GitHub w/ merge conflict

Merging happens when you have two divergent branches, such as when GitHub repo is changed and committed online (remote) and the local repo is also changed and committed, and you want to do a push or pull. The easy solution is to only perform work on one repo, or to perform a merge.

### Assignment: Amazon Web Services EC2

Elastic IP: 3.214.253.236 

### Assignment: HTML Structure Elements

You can put the full size image URL, and then use just width or height to resize it properly

### Simon CSS

The Simon CSS code that I published to my server tells the webpage to not display the header and footer if the height gets smaller than a threshold. I want to do something similar with my startup so that if the width gets smaller than a threshold, the header and footer size shrink as a function of width as opposed to being a constant size like they currently are.

### Midterm Notes:Here's an ordered list from 1 to 34 with periods:

span has a default property of inline

background-color CSS rule

When doing image with hyperlink, use a tag w/ href around img tag w/ src

CSS box model = content -> padding -> border -> margin

element.style.color = "green" for setting things to green

script tag for javascript, link tag for css

A record can point to other A record and IP

HTTPS requires certificate

# CURL Command Reference

### Grab main page

`curl localhost:4000`

### Grab user list (Need to delete this endpoint before deployment)

`curl localhost:4000/auth/list`

### Sign up

`curl -c cookies.txt -X POST localhost:4000/auth/signup -H 'Content-Type:application/json' -d '{"username":"pocketkid2","password":"asdf1234","first_name":"Adam","last_name":"Taylor","gender":"male","birth_date":"1999-04-16"}'`

### Login

`curl -c cookies.txt -X GET localhost:4000/auth/login -H 'Content-Type:application/json' -d '{"username":"pocketkid2","password":"asdf1234"}'`

# Promises, Async, and Await: The Big Picture

1. Your server needs data that it doesn't have
2. To get it, it sends a request
3. Since the request is sent to another machine, we can't guarantee when or if we will get a response
4. We don't want to pause the entire machine while waiting for a response, so we have two choices:
   a. Pause **this section** of the code and wait for the response, and let the rest of the code continue
   b. Don't wait for the response, and maybe give the computer something to do if/when we get a response
5. Promises is how we give the computer code something to do if it gets a response back from a request.
6. `async` is what we put in front of a function to tell it "Hey, just so you know, we know you're going to be waiting on something, but we aren't going to wait for you
7. `await` is what we put in front of an `async` function call to say to the computer "Hey, I know we told that function we weren't going to wait, but actually we need to wait until their code finishes before we can continue"
