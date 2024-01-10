import React, { useState } from 'react'

const Lists = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Landing Page - Website Bisnis",
      img_url: 'https://placehold.co/400x400',
      description: "Membuat website bisnis untuk usaha saya dengan kriteria yaitu",
      tag: ['Web Development']
    },
    {
      id: 2,
      name: "Landing Page - Website Judol",
      img_url: 'https://placehold.co/400x400',
      description: "Membuat website bisnis untuk Bisnis",
      tag: ['Web Development']
    }
  ]);

  return (
    <>
      <span class="badge rounded-pill text-bg-primary">Semua</span>
      <span class="badge rounded-pill text-bg-primary">Diunggah</span>
      <span class="badge rounded-pill text-bg-primary">Draft</span>

      <div className="row mt-3">
        {jobs.map((job, key) => (
          <div className="col-12">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-8">
                  <div class="d-flex align-items-center">
                    <div class="card-body">
                      <h6 class="card-title">{job.name}</h6>
                      <p class="card-text">{job.description}</p>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <img src={job.img_url} class="img-fluid rounded" alt="..." />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Lists