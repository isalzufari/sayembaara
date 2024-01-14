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
      text: `SELECT job_results.id, users.name as owner, job_results.file, job_results.title
      FROM job_results
      INNER JOIN jobs ON jobs.id = job_results.id_job
      INNER JOIN users ON users.id = job_results.id_user
      WHERE job_results.id_job = ?
      ORDER BY job_results.created_at ASC`,
      values: [jobId]
    };
    
    const [result] = await this._pool.query(query.text, query.values);
    
    return result;
  }

  async getResultById(resultId) {
    const query = {
      text: `SELECT job_results.id, users.name as owner, users.profile as profile, job_results.file, job_results.title, job_results.description
      FROM job_results
      INNER JOIN users ON users.id = job_results.id_user
      WHERE job_results.id = ?`,
      values: [resultId]
    };
    
    const [result] = await this._pool.query(query.text, query.values);
    
    return result;
  }
}

module.exports = ResultsRepository;
