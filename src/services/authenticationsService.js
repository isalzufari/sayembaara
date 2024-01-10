const AuthenticationsRepository = require('../repository/authenticationsRepository');

class AuthenticationsService {
  constructor() {
    this.AuthenticationsRepository = new AuthenticationsRepository();
  }

  async addRefreshToken(token) {
    this.AuthenticationsRepository.addRefreshToken(token);
  }

  async verifyRefreshToken(token) {
    this.AuthenticationsRepository.verifyRefreshToken(token);
  }

  async deleteRefreshToken(token) {
    this.AuthenticationsRepository.deleteRefreshToken(token);
  }
}

module.exports = AuthenticationsService;
