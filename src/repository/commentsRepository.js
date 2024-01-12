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
    console.log(query);
    const [result] = await this._pool.query(query.text, query.values);
    
    return result;
  }
}

module.exports = CommentsRepository