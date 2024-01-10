const pool = require('../db/pool');
const idGenerator = require('../utils/idGenerator');

class UsersRepository {
  constructor() {
    this.pool = pool.promise();
  }

  async addUser({
    name, email, password, profile, banner, category,
  }) {
    const id = idGenerator();

    const query = {
      text: 'INSERT INTO users(id, name, email, password, profile, banner, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values: [id, name, email, password, profile, banner, category],
    };

    await this.pool.query(query.text, query.values);

    return id;
  }
}

module.exports = UsersRepository;
