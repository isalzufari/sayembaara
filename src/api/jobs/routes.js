const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postJobHandler,
    options: {
      auth: 'sayembara_jwt',
      payload: {
        maxBytes: 1000 * 1000 * 5, // 5 Mb
      }
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
  {
    method: 'GET',
    path: '/umkm',
    handler: handler.getJobsByUmkmHandler,
    options: {
      auth: 'sayembara_jwt',
    },
  },
  {
    method: 'POST',
    path: '/{id}/comments',
    handler: handler.postCommentJobHandler,
    options: {
      auth: 'sayembara_jwt',
    },
  },
];

module.exports = routes;
