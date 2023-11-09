var express = require('express');
var data = require('./data');
var auth_router = express.Router();

auth_router.use((req, res, next) => {
    console.log(`\nAuth Request (time = ${new Date(Date.now()).toLocaleString()})`)
    next();
});

auth_router.post('/signup', (req, res) => {
    
    // Make sure the important fields are in the signup request
    if (!req.body.username) {
        console.log("\tRejecting request due to missing username");
        res.status(400).send("Missing username");
        return;
    }
    if (!req.body.password) {
        console.log("\tRejecting request due to missing password");
        res.status(400).send("Missing password");
        return;
    }

    // Make sure the username is unique
    if (data.user_exists(req.body.username)) {
        console.log("\tRejecting request due to existing username");
        res.status(409).send("Username already exists");
        return;
    }

    const user_object = {
        username: req.body.username,
        password: req.body.password,
    };

    data.add_user(user_object);

    console.log("\tUser signed up");
    res.status(200).end();
});

auth_router.post('/login', (req, res) => {

    // If we get an empty login request but we have a valid auth token cookie, return success
    if (req.cookies.auth_token != undefined) {
        const username = data.authenticate_token(req.cookies.auth_token);
        if (username) {
            console.log("\tUser already logged in");
            res.status(200).end();
            return;
        }
    }

    // If we don't receive a cookie, login the usual way
    if (!req.body.username) {
        console.log("\tRejecting request due to missing username");
        res.status(400).send("Missing username");
        return;
    }
    if (!req.body.password) {
        console.log("\tRejecting request due to missing password");
        res.status(400).send("Missing password");
        return;
    }

    // Attempt authentication and return the result
    const auth_token = data.authenticate_credentials(req.body.username, req.body.password);
    if (auth_token) {
        console.log("\tUser logged in");
        res.cookie('auth_token', auth_token, { sameSite: 'strict' });
        res.status(200).end();
    } else {
        console.log("\tRejecting request due to invalid username/password");
        res.status(401).send("Invalid username/password");
    }
});

auth_router.get('/list', (req, res) => {
    console.log("\nListing Users:");
    data.list_users();
    console.log("\nListing Tokens:");
    data.list_tokens();
    res.end();
});

module.exports = auth_router;