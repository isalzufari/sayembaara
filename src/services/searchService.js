const pool = require('../db/pool');

class SearchService {
  constructor() {
    this._pool = pool.promise();
  }

  async searchData({ q, category }) {
    const query = {
      text: 'SELECT id, name, profile FROM users WHERE category = ? AND name LIKE ?',
      values: [category, '%' + q + '%']
    };

    const [result] = await this._pool.query(
      query.text,
      query.values
    );

    console.log(result)

    return result;
  }
}

module.exports = SearchService;