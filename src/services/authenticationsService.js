const AuthenticationsRepository = require('../repository/authenticationsRepository');

class AuthenticationsService {
  constructor() {
    this.authenticationsRepository = new AuthenticationsRepository();
  }

  async addRefreshToken(token) {
    this.authenticationsRepository.addRefreshToken(token);
  }

  async verifyRefreshToken(token) {
    this.authenticationsRepository.verifyRefreshToken(token);
  }

  async deleteRefreshToken(token) {
    this.authenticationsRepository.deleteRefreshToken(token);
  }
}

module.exports = AuthenticationsService;
