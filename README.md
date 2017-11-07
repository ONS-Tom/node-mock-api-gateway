# node-mock-api-gateway
A node microservice for mocking an API Gateway

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](./LICENSE)

### Table of Contents
**[1. Environment Setup](#environment-setup-for-the-ui)**<br>
**[2. Running the Mock API Gateway](#running-the-mock-api-gateway)**<br>
**[3. Testing](#testing)**<br>
**[4. Useful Extensions](#useful-extensionsprograms)**<br>
**[5. Contributing](#contributing)**<br>
**[6. License](#license)**<br>

## Environment Setup

1. Install NPM, it is included with Node.js ([Download](https://nodejs.org/en/))

2. Set the following environment variables (use `vim ~/.profile`):

```shell
export MOCK_GW_API_URL=<url of your API>
export MOCK_GW_TIMEOUT_GET=<timeout for GET requests, in milliseconds>
export MOCK_GW_TIMEOUT_POST=<timeout for POST requests, in milliseconds>
```

## Running the mock API Gateway

1. `node index.js`

## Testing

Running `npm test` will run all the tests described below.

## Useful Extensions/Programs

* [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) - for testing the REST endpoints

## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md) for details.

## License

Copyright ©‎ 2017, Office for National Statistics (https://www.ons.gov.uk)

Released under MIT license, see [LICENSE](./LICENSE) for details.
