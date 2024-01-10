const UsersService = require('../../services/usersService');

class UsersHandler {
  constructor() {
    this.usersService = new UsersService();

    this.postUserHandler = this.postUserHandler.bind(this);
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
}

module.exports = UsersHandler;
