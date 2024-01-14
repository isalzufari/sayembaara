const pool = require("../db/pool");
const idGenerator = require("../utils/idGenerator");

class CommentsRepository {
  constructor() {
    this._pool = pool.promise();
  }

  async addJobComment({ message, userId, jobId }) {
    const id = idGenerator();

    const query = {
      text: 'INSERT INTO job_comments(id, id_user, id_job, message) VALUES (?, ?, ?, ?)',
      values: [id, userId, jobId, message],
    };

    await this._pool.query(query.text, query.values);

    return id;
  }

  async getCommentsByJobId(jobId) {
    const query = {
      text: `SELECT job_comments.id, users.name as owner, users.profile, job_comments.message
      FROM job_comments
      INNER JOIN jobs ON jobs.id = job_comments.id_job
      INNER JOIN users ON users.id = job_comments.id_user
      WHERE job_comments.id_job = ?
      ORDER BY job_comments.created_at DESC`,
      values: [jobId]
    };
    
    const [result] = await this._pool.query(query.text, query.values);
    
    return result;
  }

  async addResultComment({ message, userId, resultId }) {
    const id = idGenerator();

    const query = {
      text: 'INSERT INTO result_comments(id, id_user, id_result, message) VALUES (?, ?, ?, ?)',
      values: [id, userId, resultId, message],
    };

    await this._pool.query(query.text, query.values);

    return id;
  }

  async getCommentsByResultId(jobId) {
    const query = {
      text: `SELECT result_comments.id, users.name as owner, users.profile, result_comments.message
      FROM result_comments
      INNER JOIN job_results ON job_results.id = result_comments.id_result
      INNER JOIN users ON users.id = result_comments.id_user
      WHERE result_comments.id_result = ?
      ORDER BY result_comments.created_at DESC`,
      values: [jobId]
    };
    
    const [result] = await this._pool.query(query.text, query.values);
    
    return result;
  }
}

module.exports = CommentsRepository