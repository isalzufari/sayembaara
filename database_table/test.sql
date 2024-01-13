-- Active: 1696384805376@@127.0.0.1@3306@sayembara
CREATE DATABASE sayembara;

USE sayembara;

SHOW TABLEs;

SELECT * FROM users;
SELECT * FROM umkm;
SELECT * FROM mahasiswa;
SELECT * FROM authentications;

SELECT * FROM jobs;
SELECT * FROM job_files;

SELECT * FROM job_comments;

SELECT * FROM job_results;

DROP DATABASE sayembara;

SELECT job_comments.id, users.name as owner, users.profile, job_comments.message
      FROM job_comments
      INNER JOIN jobs ON jobs.id = job_comments.id_job
      INNER JOIN users ON users.id = job_comments.id_user
      WHERE job_comments.id_job = '39229245'
      ORDER BY job_comments.created_at DESC

SELECT job_results.id, users.name as owner, job_results.file, job_results.title
      FROM job_results
      INNER JOIN jobs ON jobs.id = job_results.id_job
      INNER JOIN users ON users.id = job_results.id_user
      WHERE job_results.id_job = '94925873'
      ORDER BY job_results.created_at ASC

SELECT * FROM job_results;