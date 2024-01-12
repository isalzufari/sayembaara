import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import api from '../../../utils/api';

const Lists = () => {
  const [jobs, setJobs] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      const jobs = await api.getJobsByUmkm();
      setJobs(jobs)
    }
    getJobs();
    return () => {

    };
  }, [reload]);

  const onUpdateDraft = async (jobsId) => {
    setReload(true);
    console.log(jobsId);
    const { status } = await api.updateDraft({ jobsId });
    if (status === 'success') {
      alert('Berhasil diubah!')
      setReload(false);
    }
  }

  return (
    <>
      <span class="badge rounded-pill text-bg-primary">Semua</span>
      <span class="badge rounded-pill text-bg-primary">Diunggah</span>
      <span class="badge rounded-pill text-bg-primary">Draft</span>

      <div className="row mt-3">
        {jobs?.map((job, key) => (
          <div className="col-12">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-8">
                  <div class="d-flex align-items-center">
                    <div class="card-body">
                      <Link to={`/umkm/job/${job.id}`} class="card-title">{job.title}</Link>
                      <p class="card-text">{job.description}</p>
                      <button onClick={() => onUpdateDraft(job.id)} className='btn btn-primary'>{job.isDraft === 0 ? 'Draft' : 'Publish'}</button>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <img style={{ height: 120 }} src={job.url_images} class="object-fit-scale img-fluid rounded" alt={job.title} />
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