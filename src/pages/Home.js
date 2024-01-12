import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = ({ authUser }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const jobs = await api.getJobs();
      setJobs(jobs)
      console.log(authUser)
    }
    getJobs();
    return () => {

    };
  }, []);

  return (
    <>
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://placehold.co/600x400" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://placehold.co/600x400" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://placehold.co/600x400" class="d-block w-100" alt="..." />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      {authUser ?
        <>
          <Link to="/umkm/job/upload" className='btn btn-primary w-100 my-3'>+ Buat Sayembara</Link>
        </>
        :
        <>
          <p className='my-3'>Sudah Daftar Belum?</p>
        </>
      }

      <div className="row">
        {jobs.map((job, key) => (
          <div className='col-12' key={key}>
            <div class="card mb-3 shadow">
              <img src={job.url_images} style={{ height: 50 }} class="card-img-top object-fit-cover" alt="..." />
              <div class="card-body">
                <div className='d-flex justify-content-between'>
                  <p>{job.owner}</p>
                  <div>
                    <span class="badge rounded-pill text-bg-primary">#{job.tags}</span>
                  </div>
                </div>
                <h5 class="card-title">{job.title}</h5>
                <p class="card-text">{job.description}</p>
                <Link to={`/umkm/job/${job.id}`} class="btn btn-primary w-100">Lihat Detail</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home