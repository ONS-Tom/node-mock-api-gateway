const rp = require('request-promise');
const timeouts = parseInt(process.env.TIMEOUT, 10) || 5000;
const logger = require('../helpers/logger')(module);

function getApiEndpoint(url) {
  logger.debug(`GET API endpoint for ${url}`);
  const options = {
    method: 'GET',
    uri: url,
    timeout: timeouts.API_GET
  };

  return rp(options);
}

function postApiEndpoint(url, postBody) {
  logger.debug(`POST API endpoint for ${url}`);
  const options = {
    method: 'POST',
    uri: url,
    timeout: timeouts.API_POST,
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(postBody),
    json: false
  };

  return rp(options);
}

module.exports.getApiEndpoint = getApiEndpoint;
module.exports.postApiEndpoint = postApiEndpoint;
