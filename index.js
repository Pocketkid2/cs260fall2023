var express = require('express');
var cookie_parser = require('cookie-parser');
var app = express();

var api_router = require('./api_router');
var auth_router = require('./auth_router');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cookie_parser());

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`\n\n\nRequest received (time = ${new Date(Date.now()).toLocaleString()})`);
    console.log(`\tMethod: ${req.method}`);
    console.log(`\tURL: ${req.originalUrl}`);
    console.log(`\tBody: ${JSON.stringify(req.body)}`);
    console.log(`\tCookies: ${JSON.stringify(req.cookies)}`);
    console.log(`\tProtocol: ${req.protocol}`);
    next();
});

app.use(express.json());

app.use('/api', api_router);
app.use('/auth', auth_router);

app.use((request, response) => {
    response.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});