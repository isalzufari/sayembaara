import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../../../utils/api';

const DetailWorkResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const splitLocation = location.pathname.split('/');
  const jobId = splitLocation[3];
  const resultId = splitLocation[5];

  const [reload, setReload] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getResultJob = async () => {
      const result = await api.getResultJobById({ jobId, resultId });
      console.log(result)
      setResult(result)
    }
    getResultJob();
    return () => {

    };
  }, [jobId, resultId, reload]);

  const onHandlerUpdateChoosen = async ({ jobId, resultId }) => {
    setReload(true);
    const { status } = await api.updateChoosen({ jobId, resultId });
    if (status === 'success') {
      alert(status)
      // return navigate('/umkm/job/list');
      setReload(false);
    }
  }

  return (
    <>
      <h1 className='fw-bold'>{result.title}</h1>
      <div class="col d-flex align-items-end mb-3">
        <img width={70} src={result.profile} alt={result.owner} className='rounded-circle img-thumbnail' />
        <div className='ms-3'>
          <p className='fw-bold'>{result.owner}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body text-center">
          <img src={result.file} class="img-fluid img-thumbnail" alt={result.title} />
          <span className='fw-bold'>Preview</span>
        </div>
      </div>
      <p className='my-3'>
        {result.description}
      </p>
      <hr></hr>
      <div class="shadow-sm mb-3 p-3">
        <div class="row g-2 d-flex align-items-center">
          <div class="col-4">
            <img src={result.file} className="object-fit-cover rounded border" height={100} width={100} alt={result.title} />
          </div>
          <div class="col-8">
            <div class="d-flex align-items-center">
              <div class="card-body">
                <h6 class="card-title fw-bold">Download File</h6>
                <p class="card-title">System Design.rar (5 MB)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <h2>Komentar</h2>
      <div className="row mt-3">
        {result.comments?.length > 0 ?
          <>
            {result.comments?.map((comment, key) => (
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
          </>
          :
          <p>Belum ada komentar!</p>
        }
      </div>
      <div class="fixed-bottom p-3 text-center">
        <button onClick={() => onHandlerUpdateChoosen({ jobId, resultId })} className='btn btn-primary'>{result.isChoose ? 'Batal' : 'Pilih Sebagai Juara'}</button>
      </div>
    </>
  )
}

export default DetailWorkResult