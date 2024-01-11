const pool = require('../db/pool');

const InvariantError = require('../exceptions/InvariantError');

class AuthenticationsRepository {
  constructor() {
    this.pool = pool.promise();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications(token) VALUES (?)',
      values: [token],
    };

    await this.pool.query(query.text, query.values);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT token FROM `token` = ?',
      values: [token],
    };

    const [result] = await this.pool.query(query.text, query.values);

    if (result.length > 0) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE `token` = ?',
      values: [token],
    };

    await this.pool.query(query.text, query.values);
  }
}

module.exports = AuthenticationsRepository;
