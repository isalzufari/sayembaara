import React from 'react'
import { Link } from 'react-router-dom'

const Profile = ({ authUser }) => {
  console.log(authUser);
  return (
    <>
      <img src={authUser.banner} class="img-fluid" alt="..."></img>
      <section style={{ marginTop: '-40px' }} className='mb-3'>
        <div class="col d-flex align-items-start">
          <img src={authUser.profile} className="img-fluid rounded-circle" alt={authUser.name}></img>
          <div className='d-flex justfiy-content-center'>
            <h4>{authUser.name}</h4>
          </div>
        </div>
      </section>
      <section className='mb-3'>
        <div class="col d-flex align-items-start">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={authUser.category === "UMKM" ? true : false} />
          </div>
          <p>Ubah menjadi akun personal</p>
        </div>
      </section>
      <section>
        {/* <Link to="/umkm/job/list" className='btn btn-primary w-100'>PEKERJAAN DIUNGGAH</Link> */}
        <div class="col d-flex align-items-start">
          <i class="bi bi-person-circle text-body-secondary flex-shrink-0 me-3"></i>
          <p>Data Pribadi</p>
        </div>

        <Link to="/umkm/job/list" class="nav-link col d-flex align-items-start ">
          <i class="bi bi-list-check text-body-secondary flex-shrink-0 me-3"></i>
          <p>List Sayembara</p>
        </Link>

        <div class="col d-flex align-items-start">
          <i class="bi bi-patch-check text-body-secondary flex-shrink-0 me-3"></i>
          <p>Verifikasi Bisnis</p>
        </div>

        <div class="col d-flex align-items-start">
          <i class="bi bi-signpost-split text-body-secondary flex-shrink-0 me-3"></i>
          <p>Layanan Iklan</p>
        </div>

        <div class="col d-flex align-items-start">
          <i class="bi bi-headset text-body-secondary flex-shrink-0 me-3"></i>
          <p>Pusat Bantuan</p>
        </div>
      </section>
    </>
  )
}

export default Profile