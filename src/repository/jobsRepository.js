/* eslint-disable no-restricted-syntax */
const pool = require('../db/pool');
const idGenerator = require('../utils/idGenerator');

class JobsRepository {
  constructor() {
    this.pool = pool.promise();
  }

  // return an id (string)
  async addJob(userId, {
    title, description, tag, deadline, reward, draft, image,
  }) {
    const id = idGenerator();

    const query = {
      text: 'INSERT INTO jobs(id, id_user, title, description, tags, deadline, reward, draft) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      values: [id, userId, title, description, tag, deadline, reward, draft],
    };

    await this.pool.query(query.text, query.values);

    for (let i = 0; i < image.length; i++) {
      this.uploadAnImageLoop(id, image[i]);
    }

    return id;
  }

  async uploadAnImageLoop(id, image) {
    const fileId = idGenerator();

    const query = {
      text: 'INSERT INTO job_files(id, id_job, file) VALUES (?, ?, ?)',
      values: [fileId, id, image],
    };

    await this.pool.query(query.text, query.values);
  }
}

module.exports = JobsRepository;
