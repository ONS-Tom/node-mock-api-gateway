'use strict';

const express = require('express');
const base64 = require('base-64');
const morgan = require('morgan');
const myParser = require('body-parser');
const compression = require('compression');
const API_URL = process.env.MOCK_GW_API_URL || 'http://localhost:9002';
const uuidv4 = require('uuid/v4');
const logger = require('./helpers/logger')(module);
const getUrlEndpoint = require('./helpers/helperMethods').getUrlEndpoint;
const validApiKey = require('./helpers/helperMethods').validApiKey;
const getApiEndpoint = require('./helpers/rerouteRequest').getApiEndpoint;
const postApiEndpoint = require('./helpers/rerouteRequest').postApiEndpoint;


// Get the admin/user credentials from environment variables
const ADMIN_USERNAME = process.env.MOCK_GW_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.MOCK_GW_ADMIN_PASSWORD || 'admin';
const USER_USERNAME = process.env.MOCK_GW_USER_USERNAME || 'test';
const USER_PASSWORD = process.env.MOCK_GW_USER_PASSWORD || 'test';

// We use the users JSON as a mock database holding { username: hashed_password }
const users = {};
users[ADMIN_USERNAME] = `Basic ${base64.encode(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`)}`;
users[USER_USERNAME] = `Basic ${base64.encode(`${USER_USERNAME}:${USER_PASSWORD}`)}`;

// We need to store all the valid API keys that uuidv4() has made
const validApiKeys = {};

const app = express();
app.use(compression()); // gzip all responses
morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms');
app.use(morgan('combined', { stream: logger.stream }));
app.use(myParser.json()); // For parsing body of POSTs

app.post('/auth', (req, res) => {
  logger.info('Checking /auth');
  const username = req.body.username;
  const basicAuth = req.get('Authorization');

  // If the provided basic authentication matches any of our own base64 encoded
  // Authorization keys in the users JSON
  if (users[username] === basicAuth) {
    logger.info('Creating API Key for user');
    const key = uuidv4();
    validApiKeys[key] = basicAuth;
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify({
      key,
      role: 'admin'
    }));
  }
  return res.sendStatus(401);
});

app.get('/reroute/*', (req, res) => {
  const url = getUrlEndpoint(req.originalUrl);
  logger.info(`Rerouting GET API request to ${url}`);

  // Check if the API Key is valid
  const apiKey = req.get('Authorization');
  if (validApiKey(validApiKeys, apiKey)) {
    getApiEndpoint(`${API_URL}${url}`)
      .then((response) => {
        logger.info('Returning re-routed GET API request');
        return res.send(response);
      })
      .catch((error) => {
        logger.error('Error rerouting GET request');
        return res.status(error.statusCode).send(error);
      });
  } else {
    return res.sendStatus(401);
  }
});

app.post('/reroute/*', (req, res) => {
  const url = getUrlEndpoint(req.originalUrl);
  logger.info(`Rerouting POST API request to ${url}`);

  // Check if the API Key is valid
  const apiKey = req.get('Authorization');
  if (validApiKey(validApiKeys, apiKey)) {
    const postBody = req.body;
    postApiEndpoint(`${API_URL}${url}`, postBody)
      .then((response) => {
        logger.info('Returning re-routed POST API request');
        return res.send(response);
      })
      .catch((error) => {
        logger.error('Error rerouting POST request');
        return res.status(error.statusCode).send(error);
      });
  } else {
    return res.sendStatus(401);
  }
});

module.exports = app;
