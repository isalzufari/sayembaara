const routes = (handler) => [
  {
    method: 'POST',
    path: '/api/v1/jobs',
    handler: handler.postJobHandler,
    options: {
      auth: 'sayembara_jwt',
    },
  },
];

module.exports = routes;
