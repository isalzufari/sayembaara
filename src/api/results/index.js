const ResultsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'results',
  version: '1.0.0',
  register: async (server, { usersService, resultsService }) => {
    const resultsHandler = new ResultsHandler(usersService, resultsService);
    server.route(routes(resultsHandler));
  },
};
