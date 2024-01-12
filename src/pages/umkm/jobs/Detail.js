import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../../../utils/api';

const Detail = () => {
  const location = useLocation();
  const splitLocation = location.pathname.split('/');
  const id = splitLocation[3];

  const [job, setJob] = useState([]);

  useEffect(() => {
    const getJob = async () => {
      const job = await api.getJobById({ id });
      console.log(job)
      setJob(job)
    }
    getJob();
    return () => {

    };
  }, [id]);


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
          {job.images?.map((image, key) => (
            <div class="carousel-item active">
              <img src={image.url_images} class="d-block w-100" alt="..." />
            </div>
          ))}
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

      <h1 className='my-3'>{job.title}</h1>
      <div className="col-12">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-4">
              <img src={job.profile} class="img-fluid rounded-circle" alt={job.owner} />
            </div>
            <div class="col-8">
              <div class="d-flex align-items-center">
                <div class="card-body">
                  <h6 class="card-title">{job.owner}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" className='btn btn-primary me-3'>Boost Ads</Link>
      <Link to="/" className='btn btn-outline-primary'>Mix & Match</Link>
      <hr></hr>
      <p className='mt-3'>{job.description}</p>
      <hr></hr>
      <div class="d-flex justify-content-between">
        <h2>hasil Kerja</h2>
        <Link to="/umkm/job/detil" className='badge text-bg-secondary'>Lainnya</Link>
      </div>
      <div className="row mt-3">
        {job.images?.map((image, key) => (
          <div className="col-4">
            <img src={image.url_images} class="d-block w-100" alt="..." />
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