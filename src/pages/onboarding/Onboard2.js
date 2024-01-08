import React from 'react'
import { Link } from 'react-router-dom'

const Onboard2 = () => {
  return (
    <div className='text-center'>
      <h4>Kembangkan Bisnis Bersama</h4>
      <h1>Mahasiswa</h1>
      <img src="/img/onboard/onboard2.png" alt="" />
      <h6>Temukan Mahasiswa Terbaik untuk Membantu Usaha Anda</h6>
      <Link to="/onboarding/3" className='btn btn-primary'>Selanjutnya</Link>
    </div>
  )
}

export default Onboard2