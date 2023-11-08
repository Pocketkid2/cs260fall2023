const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`\n\nRequest received (time = ${new Date(Date.now()).toLocaleString()})`);
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

app.use(express.static('public'));

var api_router = express.Router();
app.use('/api', api_router);

// Add APIs here

app.use((request, response) => {
    response.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});