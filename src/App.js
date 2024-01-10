import { Routes, Route, Outlet } from 'react-router-dom';

// Component
import Navigation from './components/Navigation';

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

// Layouting

const AppLayout = () => (
  <>
    <header>
      <Navigation />
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
  return (
    <Routes>
      <Route path='onboarding'>
        <Route path='1' element={<Onboard1 />} />
        <Route path='2' element={<Onboard2 />} />
        <Route path='3' element={<Onboard3 />} />
      </Route>
      <Route path='/'>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='search' element={<Search />} />
        <Route path='notification' element={<Notification />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='umkm' element={<AppLayout />}>
        <Route path='job'>
          <Route path='detail' element={<Detail />} />
          <Route path='upload' element={<Upload />} />
          <Route path='list' element={<Lists />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
