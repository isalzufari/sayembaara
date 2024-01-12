import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';

// Component
import Navigation from './components/Navigation';

// Api
import { logoutAction } from './utils/action';
import api from './utils/api';

// Page
import Onboard1 from './pages/onboarding/Onboard1';
import Onboard2 from './pages/onboarding/Onboard2';
import Onboard3 from './pages/onboarding/Onboard3';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Notification from './pages/Notification';
import Upload from './pages/umkm/jobs/Upload';
import Lists from './pages/umkm/jobs/Lists';
import Detail from './pages/umkm/jobs/Detail';
import Profile from './pages/Profile';
import RegisterRole from './pages/RegisterRole';

// Layouting
const AppLayout = ({ authUser, onSignOut }) => (
  <>
    <header>
      <Navigation authUser={authUser} onSignOut={onSignOut} />
    </header>
    <main>
      <div className='container mt-5'>
        <Outlet />
      </div>
    </main>
    <footer>

    </footer>
  </>
)

function App() {
  const navigate = useNavigate();
  const [authUser, setauthUser] = useState(null);

  const onSignOut = () => {
    setauthUser(null);
    logoutAction();
    navigate('/login');
  }

  useEffect(() => {
    const asyncPreloadProcess = async () => {
      const authUser = await api.getOwnProfile();
      if (authUser.status !== 'success') {
        if (authUser.error === "Unauthorized" && authUser.message === "Token maximum age exceeded") {
          if (window.confirm('Sesi kamu udah habis. Perpanjang sesi?')) {
            await api.refreshToken();
            const userRefresh = await api.getOwnProfile();
            setauthUser(userRefresh.data)
          } else {
            return onSignOut();
          };
        }
      } else {
        setauthUser(authUser.data);
      }
    }
    asyncPreloadProcess();
    return () => {

    };
  }, []);

  return (
    <Routes>
      <Route path='onboarding'>
        <Route path='1' element={<Onboard1 />} />
        <Route path='2' element={<Onboard2 />} />
        <Route path='3' element={<Onboard3 />} />
      </Route>
      <Route path='/'>
        <Route path='login' element={<Login setauthUser={setauthUser} />} />
        <Route path='register'>
          <Route index element={<Register />} />
          <Route path='role' element={<RegisterRole />} />
        </Route>
      </Route>
      <Route path='/' element={<AppLayout authUser={authUser} onSignOut={onSignOut} />}>
        <Route index element={<Home authUser={authUser} />} />
        <Route path='search' element={<Search />} />
        <Route path='notification' element={<Notification />} />
        <Route path='profile' element={<Profile authUser={authUser} onSignOut={onSignOut} />} />
      </Route>
      <Route path='umkm' element={<AppLayout authUser={authUser} />}>
        <Route path='job'>
          <Route path=':id' element={<Detail />} />
          <Route path='upload' element={<Upload />} />
          <Route path='list' element={<Lists />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
