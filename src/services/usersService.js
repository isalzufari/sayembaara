const { nanoid } = require('nanoid');
const pool = require('../db/pool');
const InvariantError = require('../exceptions/InvariantError');

class UsersService {
  constructor() {
    this.pool = pool.promise();
  }

  async addUser({
    name, email, password, profile, banner, category,
  }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO users(id, name, email, password, profile, banner, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values: [id, name, email, password, profile, banner, category],
    };

    const { result } = await this.pool.query(query.text, query.values);

    if (!result.insertId) {
      throw new InvariantError('user gagal ditambahkan: CreateUser');
    }

    return result.insertId;
  }
}

module.exports = UsersService;
