const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, {
    usersService,
  }) => {
    const albumsHandler = new UsersHandler(
      usersService,
    );
    server.route(routes(albumsHandler));
  },
};
