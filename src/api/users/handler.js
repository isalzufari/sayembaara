const UsersService = require('../../services/usersService');

class UsersHandler {
  constructor() {
    this.usersService = new UsersService();

    this.postUserHandler = this.postUserHandler.bind(this);
    this.handler = this.handler.bind(this);
  }

  async postUserHandler(request, h) {
    const {
      name, email, password, category,
    } = request.payload;

    const userId = await this.usersService.addUser({
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

  async handler(request, h) {
    const { credentials } = request.auth;

    const response = h.response({
      message: 'user created',
      data: {
        credentials,
      },
    });
    response.code(200);

    return response;
  }
}

module.exports = UsersHandler;
