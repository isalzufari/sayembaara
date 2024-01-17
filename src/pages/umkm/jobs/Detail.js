import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../../../utils/api';

const Detail = ({ authUser }) => {
  const location = useLocation();
  const splitLocation = location.pathname.split('/');
  const id = splitLocation[3];

  const [job, setJob] = useState([]);
  const [comment, setComment] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getJob = async () => {
      const job = await api.getJobById({ id });
      console.log(job)
      setJob(job)
    }
    getJob();
    return () => {
      setReload(false);
    };
  }, [id, reload]);

  const onPostComment = async ({ jobId, comment }) => {
    console.log(jobId, comment)
    const { status } = await api.addCommentJob({ jobId, comment });
    if (status === 'success') {
      setReload(true)
    }
  }

  return (
    <>
      <section>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            {job.images?.map((image, key) => (
              <div class="carousel-item active">
                <img src={image.url_images} class="d-block w-100 img-thumbnail" height={400} style={{ objectFit: 'scale-down' }} alt={job.title} />
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
        <div class="col d-flex align-items-end mb-3">
          <img width={70} src={job.profile} alt={job.owner} className='rounded-circle img-thumbnail' />
          <div className='ms-3'>
            <p className='fw-bold'>{job.owner}</p>
          </div>
        </div>
      </section>
      <hr></hr>
      {authUser &&
        <>
          <section>
            <Link to="/" className='btn btn-primary me-3'>Boost Ads</Link>
            <Link to="/" className='btn btn-outline-primary'>Mix & Match</Link>
          </section>
          <hr></hr>
        </>
      }
      <section>
        <p className='mt-3'>{job.description}</p>
      </section>
      <hr></hr>
      <section>
        <div class="d-flex justify-content-between">
          <h2>Hasil Kerja</h2>
          {/* <Link to="/umkm/job/detil" className='badge text-bg-secondary'>Lainnya</Link> */}
        </div>
        <div className="row mt-3">
          {job.results?.map((result, key) => (
            <Link to={`/umkm/job/${id}/result/${result.id}`} className='text-decoration-none text-black'>
              <div className={`col-12 ${result.isChoose === 1 && 'shadow'}`} key={key}>
                <div class="shadow-sm mb-3 p-3">
                  <div class="row g-2 d-flex align-items-center">
                    <div class="col-4">
                      <img src={result.file} className="object-fit-cover rounded border" height={100} width={100} alt={result.title} />
                    </div>
                    <div class="col-8">
                      <div class="d-flex align-items-center">
                        <div class="card-body">
                          <h6 class="card-title">{result.title}</h6>
                          <p class="card-title">by {result.owner}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <hr></hr>
      <section>
        <h2>Komentar</h2>
        <div class="input-group mb-3">
          <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" class="form-control" placeholder="ketik komentar disini..." aria-describedby="btn-comment" />
          <button onClick={() => onPostComment({ jobId: id, comment })} class="btn btn-outline-secondary" type="button" id="btn-comment">post</button>
        </div>
        <div className="row mt-3">
          {job.comments?.map((comment, key) => (
            <div className="col-12" key={key}>
              <div class="shadow-sm mb-3 p-3">
                <div class="row g-3">
                  <div class="col-3">
                    <img src={comment.profile} class="img-thumbnail img-fluid rounded-circle" alt="..." />
                  </div>
                  <div class="col-9">
                    <div class="d-flex align-items-center">
                      <div class="card-body">
                        <h6 class="card-title fw-bold">{comment.owner}</h6>
                        <p class="card-title">{comment.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Detail