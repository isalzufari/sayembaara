const AuthenticationsService = require('../../services/authenticationsService');
const UsersService = require('../../services/usersService');
const TokenManager = require('../../tokenize/tokenManager');

class AuthenticationsHandler {
  constructor() {
    this.authenticationsService = new AuthenticationsService();
    this.usersService = new UsersService();
    this.tokenManager = TokenManager;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const { email, password } = request.payload;
    const id = await this.usersService.login({ email, password });

    const accessToken = this.tokenManager.generateAccessToken({ id });
    const refreshToken = this.tokenManager.generateRefreshToken({ id });

    await this.authenticationsService.addRefreshToken(refreshToken);
    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    const { refreshToken } = request.payload;
    await this.authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = this.tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this.tokenManager.generateAccessToken({ id });
    return {
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    const { refreshToken } = request.payload;
    await this.authenticationsService.verifyRefreshToken(refreshToken);
    await this.authenticationsService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }
}

module.exports = AuthenticationsHandler;
