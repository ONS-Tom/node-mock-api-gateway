function validApiKey(validApiKeys, apiKey) {
  return validApiKeys[apiKey];
}

function getUrlEndpoint(url) {
  return url.substring(url.indexOf('/', 1), url.length);
}

module.exports.validApiKey = validApiKey;
module.exports.getUrlEndpoint = getUrlEndpoint;
