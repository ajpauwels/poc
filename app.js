// Third-party libs
const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

// Local libs
const Logger = require(path.join(__dirname, 'libs', 'logger.js'));

// Routing modules
const indexRoutes = require(path.join(__dirname, 'routes', 'index.js'));

// Establish which zone we're running in
let zone = process.env['ZONE'] || 'dev';
if (zone !== 'dev' && zone !== 'staging' && zone !== 'prod') {
	zone = 'dev';
}

// Create the logger
const logger = new Logger(Logger.makeLabel(__filename));

// Get the SSL keys
const tlsKey = fs.readFileSync('./tls/poc.key.pem');
const tlsCert = fs.readFileSync('./tls/poc.cert.pem');

// Create the express app
const app = express();

// Use pug to render view templates
app.set('view engine', 'pug');

// Define public assets folder
app.use(express.static('public'));

// Attach express routes
app.use('/', indexRoutes);

// Discover port to listen on
const port = process.env['PORT'] || 3000;

// Start listening for HTTPS requests
const httpsServer = https.createServer({
	key: tlsKey,
	cert: tlsCert
}, app).listen(port, () => {
	logger.info(`Started in ${zone.toUpperCase()} zone listening on port ${port}`);
});
