const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.getSearchHandler,
  },
];

module.exports = routes;
