import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <>
      <img src="https://placehold.co/600x400" class="img-fluid" alt="..."></img>
      <section className='text-center mb-3' style={{ marginTop: '-50px' }}>
        <img src="https://placehold.co/100x100" class="img-fluid rounded-circle" alt="..."></img>
        <h1>Mukti Taste</h1>
        <h5>UMKM</h5>
        <Link to="/profile/change" className='btn btn-primary'>EDIT PROFILE</Link>
      </section>
      <section>
        <Link to="/umkm/job/list" className='btn btn-primary w-100'>PEKERJAAN DIUNGGAH</Link>
      </section>
    </>
  )
}

export default Profile