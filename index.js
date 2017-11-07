'use strict';

const app = require('./app');
const logger = require('./helpers/logger')(module);

const PORT = process.env.MOCK_GW_PORT || 3003;

logger.level = 'info';
logger.info('Started Winston logger & created log file');

app.listen(PORT, () => {
  logger.info(`node-mock-api-gateway listening on port ${PORT}!`);
});
