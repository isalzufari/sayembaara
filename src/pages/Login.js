import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAction } from '../utils/action';

const Login = ({ setauthUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async ({ email, password }) => {
    const authUser = await loginAction({ email, password });
    setauthUser(authUser);
    navigate('/');
  }

  return (
    <div style={{ maxWidth: 330, padding: 15, paddingTop: 120 }} className='m-auto w-100'>
      <form className='text-center'>
        <h1>Masuk</h1>
        <div class="form-floating mb-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">ketik email anda...</label>
        </div>
        <div class="form-floating mb-3">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="floatingPassword" placeholder="password" />
          <label for="floatingPassword">ketik sandi anda...</label>
        </div>

        <button onClick={() => onLogin({ email, password })} class="w-100 btn btn btn-primary" type="button">masuk</button>
        <p className='mt-3'>Belum punya akun? <Link to="/register">Daftar</Link></p>
      </form>
    </div>
  )
}

export default Login