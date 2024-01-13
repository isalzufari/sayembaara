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
];

module.exports = routes;
