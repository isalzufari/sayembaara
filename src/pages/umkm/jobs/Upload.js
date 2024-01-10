import React from 'react'
import { Link } from 'react-router-dom'

const Upload = () => {
  return (
    <>
      <div class="input-group mb-3">
        <input type="file" class="form-control" id="inputGroupFile02" />
        <label class="input-group-text" for="inputGroupFile02">Upload</label>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="d-flex justify-content-end">
        <Link to="/umkm/job/list" type="button" class="btn btn-primary mx-3">Draft</Link>
        <Link type="/umkm/job/detil" class="btn btn-primary">Post</Link>
      </div>
    </>
  )
}

export default Upload