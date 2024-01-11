const pool = require('../db/pool');
const idGenerator = require('../utils/idGenerator');

const InvariantError = require('../exceptions/InvariantError');

class UsersRepository {
  constructor() {
    this.pool = pool.promise();
  }

  // return an id (string)
  async addUser({
    name, email, password, profile, banner, category,
  }) {
    const id = idGenerator();

    let query = {
      text: 'INSERT INTO users(id, name, email, password, profile, banner, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values: [id, name, email, password, profile, banner, category],
    };

    await this.pool.query(query.text, query.values);

    if (category === 'UMKM') {
      const categoryId = idGenerator();
      query = {
        text: 'INSERT INTO umkm(id, id_user, verified) VALUES (?, ?, ?)',
        values: [categoryId, id, false],
      };

      await this.pool.query(query.text, query.values);
    }

    if (category === 'MAHASISWA') {
      const categoryId = idGenerator();
      query = {
        text: 'INSERT INTO mahasiswa(id, id_user, expert) VALUES (?, ?, ?)',
        values: [categoryId, id, false],
      };

      await this.pool.query(query.text, query.values);
    }

    return id;
  }

  async avaibilityEmail(email) {
    const query = {
      text: 'SELECT id FROM `users` WHERE `email` = ?',
      values: [email],
    };

    const [result] = await this.pool.query(query.text, query.values);

    if (result.length > 0) {
      throw new InvariantError('email is used');
    }
  }

  // return object of id (string), password (string), and category (string)
  async getPasswordByEmail(email) {
    const query = {
      text: 'SELECT id, password, category FROM `users` WHERE email = ?',
      values: [email],
    };

    const [result] = await this.pool.query(query.text, query.values);

    if (result.length === 0) {
      throw new InvariantError('email or password wrong');
    }

    return result[0];
  }
}

module.exports = UsersRepository;
