const JobsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'jobs',
  version: '1.0.0',
  register: async (server, { jobsService, usersService }) => {
    const jobsHandler = new JobsHandler(jobsService, usersService);
    server.route(routes(jobsHandler));
  },
};
