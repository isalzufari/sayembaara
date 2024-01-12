const JobsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'jobs',
  version: '1.0.0',
  register: async (server, { jobsService, usersService, commentsService }) => {
    const jobsHandler = new JobsHandler(jobsService, usersService, commentsService);
    server.route(routes(jobsHandler));
  },
};
