import React from 'react'
import { Link } from 'react-router-dom'

const Onboard3 = () => {
  return (
    <div className='text-center'>
      <h4>Hemat Waktu & Tenaga dengan</h4>
      <h1>Sistem Sayembara</h1>
      <img src="/img/onboard/onboard3.png" alt="" />
      <h6>Pilih Hasil Terbaik diantara Mahasiswa yang Berkontribusi </h6>
      <Link to="/onboarding/3" className='btn btn-primary'>Selanjutnya</Link>
    </div>
  )
}

export default Onboard3