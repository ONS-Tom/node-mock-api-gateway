const rp = require('request-promise');
const TIMEOUT_GET = parseInt(process.env.MOCK_GW_TIMEOUT_GET, 10) || 5000;
const TIMEOUT_POST = parseInt(process.env.MOCK_GW_TIMEOUT_POST, 10) || 5000;
const logger = require('../helpers/logger')(module);

function getApiEndpoint(url) {
  logger.debug(`GET API endpoint for ${url}`);
  const options = {
    method: 'GET',
    uri: url,
    timeout: TIMEOUT_GET
  };

  return rp(options);
}

function postApiEndpoint(url, postBody) {
  logger.debug(`POST API endpoint for ${url}`);
  const options = {
    method: 'POST',
    uri: url,
    timeout: TIMEOUT_POST,
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(postBody),
    json: false
  };

  return rp(options);
}

module.exports.getApiEndpoint = getApiEndpoint;
module.exports.postApiEndpoint = postApiEndpoint;
