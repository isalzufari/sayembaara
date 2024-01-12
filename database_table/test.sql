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

DROP DATABASE sayembara;

SELECT job_comments.id, users.name as owner, users.profile, job_comments.message
      FROM job_comments
      INNER JOIN jobs ON jobs.id = job_comments.id_job
      INNER JOIN users ON users.id = job_comments.id_user
      WHERE job_comments.id_job = '39229245'
      ORDER BY job_comments.created_at DESC