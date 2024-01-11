const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postJobHandler,
    options: {
      auth: 'sayembara_jwt',
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getJobsHandler,
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getJobHandler,
  },
];

module.exports = routes;
