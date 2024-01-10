import React from 'react'
import { Link } from 'react-router-dom'

const Onboard1 = () => {
  return (
    <div className='text-center'>
      <h4>Selamat Datang di</h4>
      <h1>Sayembaara</h1>
      <img src="/img/onboard/onboard1.png" alt="" />
      <h6>Kembangkan UMKM Anda bersama Mahasiswa</h6>
      <Link to="/onboarding/2" className='btn btn-primary w-100'>Selanjutnya</Link>
    </div>
  )
}

export default Onboard1