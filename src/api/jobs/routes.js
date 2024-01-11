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
  {
    method: 'PUT',
    path: '/{id}/draft',
    handler: handler.putDraftHandler,
    options: {
      auth: 'sayembara_jwt',
    },
  },
];

module.exports = routes;
