import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div style={{ maxWidth: 330, padding: 15, paddingTop: 120 }} className='m-auto w-100'>
      <form className='text-center'>
        <h1>Masuk</h1>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">ketik email anda...</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">ketik sandi anda...</label>
        </div>

        <button class="w-100 btn btn btn-primary" type="button">masuk</button>
        <p className='mt-3'>belum punya akun? <Link to="/register">daftar</Link></p>
      </form>
    </div>
  )
}

export default Login