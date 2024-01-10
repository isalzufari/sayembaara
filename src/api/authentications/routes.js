const routes = (handler) => [
  {
    method: 'POST',
    path: '/api/v1/authentications',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/api/v1/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/api/v1/authentications',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;
