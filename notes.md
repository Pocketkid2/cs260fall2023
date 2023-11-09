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

`curl -X POST localhost:4000/auth/signup -H 'Content-Type:application/json' -d '{"username":"pocketkid2","password":"asdf1234","first_name":"Adam","last_name":"Taylor","gender":"male","birth_date":"1999-04-16"}'`

### Login

`curl localhost:4000/auth/login -H 'Content-Type:application/json' -d '{"username":"pocketkid2","password":"asdf1234"}'`
