class UsersHandler {
  constructor(service) {
    this._service = service;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const {
      name, email, password, category,
    } = request.payload;

    const userId = await this._service.addUser({
      name, email, password, category,
    });

    const response = h.response({
      status: 'success',
      data: {
        userId,
      },
    });
    response.code(201);

    return response;
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.auth.credentials;

    const user = await this._service.getUserById({ id });

    const response = h.response({
      status: 'success',
      data: user
    });
    response.code(200);
    return response;
  }
}

module.exports = UsersHandler;
