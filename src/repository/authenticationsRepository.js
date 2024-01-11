const pool = require('../db/pool');

const InvariantError = require('../exceptions/InvariantError');

class AuthenticationsRepository {
  constructor() {
    this._pool = pool.promise();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications(token) VALUES (?)',
      values: [token],
    };

    await this._pool.query(query.text, query.values);
  }

  async verifyRefreshToken(token) {
    try {
      const query = {
        text: 'SELECT `token` FROM `authentications` WHERE `token` = ?',
        values: [token],
      };

      const [result, fields] = await this._pool.query(
        query.text,
        query.values,
      );

      if (!result.length > 0) {
        throw new InvariantError('verifyRefreshToken: refresh token tidak valid');
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE `token` = ?',
      values: [token],
    };

    await this._pool.query(query.text, query.values);
  }
}

module.exports = AuthenticationsRepository;
