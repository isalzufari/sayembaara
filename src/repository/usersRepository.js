const pool = require('../db/pool');
const idGenerator = require('../utils/idGenerator');

const InvariantError = require('../exceptions/InvariantError');

class UsersRepository {
  constructor() {
    this._pool = pool.promise();
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

    await this._pool.query(query.text, query.values);

    if (category === 'UMKM') {
      const categoryId = idGenerator();
      query = {
        text: 'INSERT INTO umkm(id, id_user, verified) VALUES (?, ?, ?)',
        values: [categoryId, id, false],
      };

      await this._pool.query(query.text, query.values);
    }

    if (category === 'MAHASISWA') {
      const categoryId = idGenerator();
      query = {
        text: 'INSERT INTO mahasiswa(id, id_user, expert) VALUES (?, ?, ?)',
        values: [categoryId, id, false],
      };

      await this._pool.query(query.text, query.values);
    }

    return id;
  }

  async avaibilityEmail(email) {
    const query = {
      text: 'SELECT id FROM `users` WHERE `email` = ?',
      values: [email],
    };

    const [result] = await this._pool.query(query.text, query.values);

    if (result.length > 0) {
      throw new InvariantError('email is used');
    }
  }

  // return object of id (string), password (string), and category (string)
  async getPasswordByEmail(email) {
    const query = {
      text: 'SELECT id, password FROM `users` WHERE email = ?',
      values: [email],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values
    );

    if (!result.length > 0) {
      throw new InvariantError('getPasswordByEmail: email wrong or deleted!');
    }

    return result[0];
  }

  async getUserById(id) {
    try {
      const query = {
        text: 'SELECT name, email, profile, banner, category FROM `users` WHERE `id` = ?',
        values: [id],
      };

      const [result] = await this._pool.query(
        query.text,
        query.values,
      );

      return result[0];
    } catch (error) {
      console.log(error)
    }
  }

  async verifyRoleById(id) {
    try {
      const query = {
        text: 'SELECT `category` FROM `users` WHERE `id` = ?',
        values: [id],
      };

      const [result] = await this._pool.query(
        query.text,
        query.values,
      );

      return result[0];
    } catch (error) {
      console.log(error)
    }
  }

  async getOwnerNameById(id) {
    try {
      const query = {
        text: 'SELECT name as owner FROM `users` WHERE `id` = ?',
        values: [id],
      };

      const [result] = await this._pool.query(
        query.text,
        query.values,
      );

      return result[0];
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UsersRepository;
