const JobsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'jobs',
  version: '1.0.0',
  register: async (server) => {
    const jobsHandler = new JobsHandler();
    server.route(routes(jobsHandler));
  },
};
