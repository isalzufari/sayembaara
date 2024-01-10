import React, { useState } from 'react'

const Home = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Landing Page - Website Bisnis",
      description: "Membuat website bisnis untuk usaha saya dengan kriteria yaitu",
      tag: ['Web Development']
    },
    {
      id: 2,
      name: "Landing Page - Website Judol",
      description: "Membuat website bisnis untuk Bisnis",
      tag: ['Web Development']
    }
  ]);
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

      <button className='btn btn-primary w-100 my-3'>+ Buat Sayembara</button>

      <div className="row">
        {jobs.map((job, key) => (
          <div className='col-12'>
            <div class="card mb-3 shadow">
              <img src="https://placehold.co/600x400" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{job.name}</h5>
                <p class="card-text">{job.description}</p>
                <a href="#/" class="btn btn-primary">{job.id}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home