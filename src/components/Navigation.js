import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const slug = locationSplit[1];

  console.log(slug)

  return (
    <nav class="navbar bg-light fixed-top">
      <div class="container-fluid d-grid gap-3 align-items-center" style={{ gridTemplateColumns: '1fr 4fr 1fr' }}>

        {slug === '' ?
          <>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <i class="bi bi-list"></i>
            </button>
            <input className='form-control' type='text' />
            <Link to="/notification" className="navbar-toggler" type="button">
              <i class="bi bi-bell"></i>
            </Link>
          </>
          :
          <>
            <Link to="/" className="navbar-toggler" type="button">
              <i class="bi bi-arrow-left"></i>
            </Link>
            <a class="navbar-brand" href="#">{slug}</a>
          </>
        }

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Sayembara</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <Link to="/" className={`nav-link ${slug === '' && 'active'}`} aria-current="page" href="#">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/profile" class={`nav-link ${slug === 'profile' && 'active'}`} href="#">Profile</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>

            <button class="btn btn-outline-primary" type="submit">Logout</button>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation