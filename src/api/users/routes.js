const routes = (handler) => [
  {
    method: 'POST',
    path: '/api/v1/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
];

module.exports = routes;
