import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Detail = () => {
  const [resultJob, setResultJob] = useState([
    {
      id: 1,
      img_url: 'https://placehold.co/400x400'
    },
    {
      id: 2,
      img_url: 'https://placehold.co/400x400'
    },
    {
      id: 3,
      img_url: 'https://placehold.co/400x400'
    }
  ]);
  const [comments, setComments] = useState([
    {
      id: 1,
      img_url: 'https://placehold.co/50x50',
      owner: 'Title',
      comment: 'Ini Komentar!'
    },
    {
      id: 2,
      img_url: 'https://placehold.co/50x50',
      owner: 'Title',
      comment: 'Ini Komentar!',
      replied: [
        {
          id: 1,
          img_url: 'https://placehold.co/50x50',
          owner: 'Title',
          comment: 'Ini Balasan Komentar!'
        },
      ]
    },
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

      <h1 className='my-3'>Content Creator</h1>
      <Link to="/" className='btn btn-primary'>BOOST ADS</Link>
      <Link to="/" className='btn btn-outline-primary'>MIX AND MATCH</Link>
      <p>deskripsi</p>
      <hr></hr>
      <h2>hasil Kerja</h2>
      <span class="badge rounded-pill text-bg-primary">Semua</span>
      <span class="badge rounded-pill text-bg-primary">Terbaru</span>
      <span class="badge rounded-pill text-bg-primary">Terpopuler</span>
      <div className="row mt-3">
        {resultJob.map((job, key) => (
          <div className="col-4">
            <img src={job.img_url} class="d-block w-100" alt="..." />
          </div>
        ))}

      </div>
      <hr></hr>
      <h2>Komentar</h2>
      <div className="row mt-3">
        {comments.map((data, key) => (
          <div className="col-12">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-2">
                  <img src={data.img_url} class="img-fluid rounded-circle" alt="..." />
                </div>
                <div class="col-10">
                  <div class="d-flex align-items-center">
                    <div class="card-body">
                      <h6 class="card-title">{data.owner}</h6>
                      <p class="card-title">{data.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Detail