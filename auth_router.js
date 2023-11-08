var express = require('express');
var auth_router = express.Router();

auth_router.use((req, res, next) => {
    console.log(`Auth Request (time = ${new Date(Date.now()).toLocaleString()})`)
    next();
});

auth_router.post('/signup', (req, res) => {
    console.log("Signup request received");
    res.send("Signup request received");
});

auth_router.post('/login', (req, res) => {
    console.log("Login request received");
    res.send("Login request received");
});

module.exports = auth_router;