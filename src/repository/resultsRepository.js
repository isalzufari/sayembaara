const pool = require("../db/pool");
const idGenerator = require("../utils/idGenerator");

class ResultsRepository {
  constructor() {
    this._pool = pool.promise();
  }

  async postResult(userId, jobId, { title, description, file }) {
    const id = idGenerator();
    
    const query = {
      text: 'INSERT INTO job_results(id, id_user, id_job, title, description, file) VALUES (?, ?, ?, ?, ?, ?)',
      values: [id, userId, jobId, title, description, file],
    }

    await this._pool.query(query.text, query.values);

    return id;
  }

  async getResultsByJobId(jobId) {
    const query = {
      text: `SELECT job_results.id, users.name as owner, job_results.file, job_results.title, job_results.is_choose as isChoose
      FROM job_results
      INNER JOIN jobs ON jobs.id = job_results.id_job
      INNER JOIN users ON users.id = job_results.id_user
      WHERE job_results.id_job = ?
      ORDER BY job_results.is_choose DESC, job_results.created_at DESC`,
      values: [jobId]
    };
    
    const [result] = await this._pool.query(query.text, query.values);
    
    return result;
  }

  async getResultById(resultId) {
    const query = {
      text: `SELECT job_results.id, users.name as owner, users.profile as profile, job_results.file, job_results.title, job_results.description, job_results.is_choose as isChoose
      FROM job_results
      INNER JOIN users ON users.id = job_results.id_user
      WHERE job_results.id = ?`,
      values: [resultId]
    };
    
    const [result] = await this._pool.query(query.text, query.values);
    
    return result[0];
  }

  async choosenResult(jobId, resultId) {
    const id = idGenerator();
    
    let query = {
      text: 'INSERT INTO results_choosen(id, id_job, id_result) VALUES (?, ?, ?)',
      values: [id, jobId, resultId]
    };

    await this._pool.query(query.text, query.values);
    
    query = {
      text: 'UPDATE job_results SET is_choose = true WHERE id = ?',
      values: [resultId]
    };
    
    await this._pool.query(query.text, query.values);

    return id;
  }
}

module.exports = ResultsRepository;
