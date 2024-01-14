const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postResultHandler,
    options: {
      auth: 'sayembara_jwt',
      payload: {
        maxBytes: 1000 * 1000 * 5, // 5 Mb
      }
    },
  },
  {
    method: 'POST',
    path: '/{resultId}/comments',
    handler: handler.postCommentResultHandler,
    options: {
      auth: 'sayembara_jwt',
    },
  },
  {
    method: 'GET',
    path: '/{resultId}',
    handler: handler.getResultByIdHandler,
  },
  {
    method: 'POST',
    path: '/{resultId}/choosen',
    handler: handler.choosenResult,
    options: {
      auth: 'sayembara_jwt',
    },
  },
];

module.exports = routes;
