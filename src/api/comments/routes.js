const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postCommentJobHandler,
    options: {
      auth: 'sayembara_jwt',
    },
  },
];

module.exports = routes;
