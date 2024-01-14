const ResultsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'results',
  version: '1.0.0',
  register: async (server, { usersService, resultsService, commentsService, jobsService }) => {
    const resultsHandler = new ResultsHandler(usersService, resultsService, commentsService, jobsService);
    server.route(routes(resultsHandler));
  },
};
