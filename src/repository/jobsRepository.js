/* eslint-disable no-restricted-syntax */
const pool = require('../db/pool');
const idGenerator = require('../utils/idGenerator');

class JobsRepository {
  constructor() {
    this._pool = pool.promise();
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

    await this._pool.query(query.text, query.values);

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

    await this._pool.query(query.text, query.values);
  }

  async getJobs() {
    const query = {
      text: `SELECT jobs.id, jobs.id_user as owner, jobs.title, jobs.description, jobs.tags, job_files.file as url_images
      FROM jobs
      INNER JOIN job_files ON jobs.id = job_files.id_job
      WHERE jobs.draft = 0
      GROUP BY jobs.id`,
    };

    const [result] = await this._pool.query(query.text);

    return result;
  }

  async getJobById(id) {
    try {
      const query = {
        text: `SELECT jobs.title, jobs.description, users.name as owner, users.profile
        FROM jobs 
        INNER JOIN users ON users.id = jobs.id_user
        WHERE jobs.id = ?`,
        values: [id]
      };

      const [result] = await this._pool.query(
        query.text,
        query.values
      );

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getImagesFromJobId(id) {
    try {
      const query = {
        text: `SELECT file as url_images FROM job_files WHERE id_job = ?`,
        values: [id]
      };

      const [result] = await this._pool.query(
        query.text,
        query.values
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getIsDraftById(id) {
    const query = {
      text: 'SELECT `draft` as isDraft FROM jobs WHERE id = ?',
      values: [id],
    };

    const result = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0][0];
  }

  async updateIsDraft({ updateIsDraft, userId, jobId }) {
    const query = {
      text: 'UPDATE `jobs` SET draft = ? WHERE id = ?',
      values: [updateIsDraft, jobId],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async getJobsByUmkmById(userId) {
    console.log(userId);
    try {
      const query = {
        text: `SELECT users.name as owner, jobs.id, jobs.title, jobs.draft as isDraft, job_files.file as url_images
        FROM jobs 
        INNER JOIN job_files ON jobs.id = job_files.id_job
        INNER JOIN users ON users.id = jobs.id_user
        WHERE jobs.id_user = ?
        GROUP BY jobs.id`,
        values: [userId]
      };

      const [result] = await this._pool.query(query.text, query.values);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = JobsRepository;
