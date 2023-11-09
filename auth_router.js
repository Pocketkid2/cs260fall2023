var express = require('express');
var auth_router = express.Router();

users = [];

auth_router.use((req, res, next) => {
    console.log(`\nAuth Request (time = ${new Date(Date.now()).toLocaleString()})`)
    next();
});

auth_router.post('/signup', (req, res) => {
    if (!req.body.username || 
        !req.body.password ||
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.gender ||
        !req.body.birth_date) {
        console.log("\tRejecting request due to missing fields");
        res.status(400).send("Missing required fields");
        return;
    }

    for (i = 0; i < users.length; i++) {
        if (users[i].username == req.body.username) {
            console.log("\tRejecting request due to duplicate username");
            res.status(400).send("Duplicate username");
            return;
        }
    }

    const user_object = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birth_date: req.body.birth_date
    };
    users.push(user_object);

    console.log("\tUser added");
    res.status(200).send("User added");
});

auth_router.get('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        console.log("\tRejecting request due to missing fields");
        res.status(400).send("Missing username or password");
        return;
    }

    for (i = 0; i < users.length; i++) {
        if (users[i].username == req.body.username &&
            users[i].password == req.body.password) {
            console.log("Found user");
            res.status(200).send("User found");
            return;
        }
    }

    console.log('Did not find user');
    res.status(404).send("User not found");
});

auth_router.get('/list', (req, res) => {
    console.log("\tListing users");
    console.log('\t' + users);
    res.send(users);
});

module.exports = auth_router;