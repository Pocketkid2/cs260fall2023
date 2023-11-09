var express = require('express');
var app = express();

var api_router = require('./api_router');
var auth_router = require('./auth_router');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// 1. Log request to console
app.use((req, res, next) => {
    console.log(`\n\n\nRequest received (time = ${new Date(Date.now()).toLocaleString()})`);
    console.log(`\tMethod: ${req.method}`);
    console.log(`\tURL: ${req.originalUrl}`);
    console.log(`\tBody: ${JSON.stringify(req.body)}`);
    console.log(`\tParams: ${JSON.stringify(req.params)}`);
    console.log(`\tQuery: ${JSON.stringify(req.query)}`);
    console.log(`\tHeaders: ${JSON.stringify(req.headers)}`);
    console.log(`\tCookies: ${JSON.stringify(req.cookies)}`);
    console.log(`\tIP: ${req.ip}`);
    console.log(`\tProtocol: ${req.protocol}`);
    next();
});

// 2. Convert body to JSON
app.use(express.json());

// 3. Route /api and /auth accordingly
app.use('/api', api_router);
app.use('/auth', auth_router);

// 4. If request is a file, serve that next
app.use(express.static('public'));

// 5. If none of the above, give index.html
app.use((request, response) => {
    response.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});