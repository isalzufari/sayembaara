import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../utils/api'

const RegisterRole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  const onRegister = async ({ name, email, password, category }) => {
    console.log(name, email, password, category);
    const { status } = await api.register({ name, email, password, category });
    if (status === 'success') {
      return navigate('/login');
    }
  }

  const handleRoleCheck = (e, role) => {
    console.log(e.target.checked, role);
    if (e.target.checked) {
      setCategory(role);
    } else {
      setCategory('');
    }
  }

  return (
    <div style={{ maxWidth: 330, padding: 15, paddingTop: 120 }} className='m-auto w-100'>
      <div className='text-center'>
        <h1>Apa Posisi Anda Saat Ini?</h1>
      </div>
      <p class="d-flex flex-column">
        <input type="checkbox" class="btn-check" id="btn-check-umkm" autocomplete="off" onChange={(e) => handleRoleCheck(e, 'UMKM')} />
        <label class="w-100 btn btn-outline-primary" for="btn-check-umkm">UMKM</label><br />

        <input type="checkbox" class="btn-check" id="btn-check-mhs" autocomplete="off" onChange={(e) => handleRoleCheck(e, 'MAHASISWA')} />
        <label class="w-100 btn btn-outline-primary" for="btn-check-mhs">Mahasiswa</label><br />
      </p>
      <button onClick={() => onRegister({ ...location.state, category })} class="w-100 btn btn btn-primary" type="button">Daftar</button>
    </div>
  )
}

export default RegisterRole