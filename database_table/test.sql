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

SELECT result_comments.id, users.name as owner, users.profile, result_comments.message
      FROM result_comments
      INNER JOIN job_results ON job_results.id = result_comments.id_result
      INNER JOIN users ON users.id = result_comments.id_user
      WHERE result_comments.id_result = '36971720'
      ORDER BY result_comments.created_at DESC

SELECT job_results.id, users.name as owner, job_results.file, job_results.title, job_results.is_choose as choose
      FROM job_results
      INNER JOIN jobs ON jobs.id = job_results.id_job
      INNER JOIN users ON users.id = job_results.id_user
      WHERE job_results.id_job = '75170099'
      ORDER BY job_results.is_choose, job_results.created_at ASC

SELECT job_results.id, users.name as owner, job_results.file, job_results.title, job_results.is_choose as isChoose
      FROM job_results
      INNER JOIN jobs ON jobs.id = job_results.id_job
      INNER JOIN users ON users.id = job_results.id_user
      WHERE job_results.id_job = '11652657'
      ORDER BY job_results.is_choose DESC, job_results.created_at DESC;