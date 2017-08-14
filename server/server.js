// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // [SC] mongodb

// Get our API routes
const api = require('./server/routes/api');
const account = require('./server/routes/account');
const book = require('./server/routes/book');
const search = require('./server/routes/search');
const trans = require('./server/routes/trans');

const app = express();

const DB = 'mylib';
const uri = 'mongodb://mymongo:27017/'+DB;
const opt = { useMongoClient: true };

mongoose.Promise = global.Promise;
mongoose.connect(uri, opt, function(err) {
    if (err) console.error(err);
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api/trans', trans);
app.use('/api/account', account);
app.use('/api/book', book);
app.use('/api/search', search);
app.use('/api', api);

// Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '9000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
