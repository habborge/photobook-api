const express = require('express');
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id')();

const logger = require('./config/logger');
const api = require('./api/v1');

const app = express();

// setup middleware
app.use(addRequestId);
app.use(logger.requests);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Setup router and routes
app.use('/api', api);
app.use('/api/v1', api);

// No route found handler
app.use((req, res, next) => {
  const message = 'Route not found';
  const statusCode = 404;

  next({
    message,
    statusCode,
    type: 'info',
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message, type = 'error' } = err;

  const log = `${logger.header(req)} ${statusCode} ${message}`;

  logger[type](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
