const SearchHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'search',
  version: '1.0.0',
  register: async (server, { searchService }) => {
    const searchHandler = new SearchHandler(searchService);
    server.route(routes(searchHandler));
  },
};
