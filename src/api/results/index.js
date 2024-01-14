const ResultsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'results',
  version: '1.0.0',
  register: async (server, { usersService, resultsService, commentsService }) => {
    const resultsHandler = new ResultsHandler(usersService, resultsService, commentsService);
    server.route(routes(resultsHandler));
  },
};
