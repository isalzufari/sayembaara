const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'sayembara_jwt',
    },
  },
];

module.exports = routes;
