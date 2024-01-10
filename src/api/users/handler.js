class UsersHandler {
  constructor(service) {
    this.service = service;
  }

  async postUserHandler(request, h) {
    const {
      name, email, password, category,
    } = request.payload;

    const userId = await this.service.addUser({
      name, email, password, category,
    });

    const response = h.response({
      message: 'user created',
      data: {
        userId,
      },
    });
    response.code(201);

    return response;
  }
}

module.exports = UsersHandler;
