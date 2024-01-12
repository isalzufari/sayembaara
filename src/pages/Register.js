import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNextPage = ({ name, email, password }) => {
    return navigate('/register/role', { state: { name, email, password } });
  }

  return (
    <div style={{ maxWidth: 330, padding: 15, paddingTop: 120 }} className='m-auto w-100'>
      <form className='text-center'>
        <h1>Daftar</h1>
        <div class="form-floating mb-3">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">ketik nama anda...</label>
        </div>
        <div class="form-floating mb-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">ketik email anda...</label>
        </div>
        <div class="form-floating mb-3">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">ketik sandi anda...</label>
        </div>
        <button onClick={() => onNextPage({ name, email, password })} class="w-100 btn btn btn-primary" type="button">selanjutnya</button>
        <p className='mt-3'>Sudah punya akun? <Link to="/login">Masuk</Link></p>
      </form>
    </div>
  )
}

export default Register