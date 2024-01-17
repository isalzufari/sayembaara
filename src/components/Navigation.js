/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navigation = ({ authUser, onSignOut }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationSplit = location.pathname.split('/');
  const slug = locationSplit[1];
  console.log(authUser);

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
            <a onClick={(e) => navigate(-1)} className="navbar-toggler" type="button">
              <i class="bi bi-arrow-left"></i>
            </a>
            <a class="navbar-brand" href="#/">{slug}</a>
          </>
        }

        <div class="offcanvas offcanvas-start" style={{ width: '250px' }} tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header shadow-sm">
            {/* <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Sayembara</h5> */}
            <img src="./img/navbar/logo.png" alt='Sayembaara' height={30} />
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            {authUser ?
              <>
                <div class="col d-flex align-items-end mb-3">
                  <img src={authUser?.profile} alt={authUser?.name} className='rounded-circle' />
                  <div className='ms-3'>
                    <p>{authUser?.name}</p>
                  </div>
                </div>
                <Link to="/umkm/job/upload" class="btn btn-outline-primary w-100" type="button">+ Buat Sayembara</Link>
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 mt-3">
                  <li class="nav-item">
                    <Link to="/" className={`nav-link ${slug === '' && 'active'}`} aria-current="page" href="#">Beranda</Link>
                  </li>
                  <hr></hr>
                  <li class="nav-item dropdown">
                    <a class={`nav-link ${slug === 'profile' && 'active'} dropdown-toggle`} href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Profil
                    </a>
                    <ul class="dropdown-menu mb-3">
                      <li><Link to="/umkm/job/list" class="dropdown-item">Sayembara Terunggah</Link></li>
                      <li><Link to="/profile" class="dropdown-item">Edit Profil</Link></li>
                      <li><a class="dropdown-item" href="#/">Ajukan Verifikasi</a></li>
                    </ul>
                  </li>
                </ul>
                <hr></hr>
                <button onClick={onSignOut} class="btn btn-outline-primary" type="button">Logout</button>
              </>
              :
              <>
                <Link className='btn btn-primary w-100' to="login">Login</Link>
              </>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation