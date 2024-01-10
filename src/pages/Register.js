import React from 'react'

const Register = () => {
  return (
    <div style={{ maxWidth: 330, padding: 15, paddingTop: 120 }} className='m-auto w-100'>
      <form className='text-center'>
        <h1>Daftar</h1>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">ketik nama anda...</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">ketik email anda...</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">ketik sandi anda...</label>
        </div>
      </form>
    </div>
  )
}

export default Register