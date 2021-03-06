#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();
const app = require('./app');
const { name } = require('./package.json');
const debug = require('debug')(`${name}:server`);
const http = require('http');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server, and listen on provided port, on all network interfaces.
 */
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const intPort = parseInt(val, 10);

  if (isNaN(intPort)) return val;
  if (intPort >= 0) return intPort;

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('\n\n\n\nApp: \x1b[36mlistening on ' + bind + '\n\n\n\n\x1b[0m');
  console.log('\n\n\n\nApp: \x1b[36mlistening on ' + bind + '\n\n\n\n\x1b[0m');
}
