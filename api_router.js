var express = require('express');
var api_router = express.Router();

api_router.use((req, res, next) => {
    console.log(`API Request (time = ${new Date(Date.now()).toLocaleString()})`)
    next();
});

api_router.get('/list/:list(watchlist|favorites)', (req, res) => {
    console.log(`Retrieve entire list for ${req.params.list}`);
    res.send(`Retrieve entire list for ${req.params.list}`);
});

api_router.get('/exists/:list(watchlist|favorites)', (req, res) => {
    console.log(`Check if film exists in ${req.params.list}`);
    res.send(`Check if film exists in ${req.params.list}`);
});

api_router.post('/add/:list(watchlist|favorites)', (req, res) => {
    console.log(`Add film to ${req.params.list}`);
    res.send(`Add film to ${req.params.list}`);
});

api_router.delete('/remove/:list(watchlist|favorites)', (req, res) => {
    console.log(`Remove film from ${req.params.list}`);
    res.send(`Remove film from ${req.params.list}`);
});

module.exports = api_router;