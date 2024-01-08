import { Routes, Route, Outlet } from 'react-router-dom';

// Component
import Navigation from './components/Navigation';

// Page
import Home from './pages/Home';
import Login from './pages/Login';
import Onboard1 from './pages/onboarding/Onboard1';
import Onboard2 from './pages/onboarding/Onboard2';
import Onboard3 from './pages/onboarding/Onboard3';

// Layouting
// const AppLayout = () => (
//   <div className='container mt-5'>
//     <Outlet />
//   </div>
// )

const AppLayout = () => (
  <>
    <header>
      <Navigation />
    </header>
    <main>
      <Outlet />
    </main>
    <footer>

    </footer>
  </>
)

function App() {
  return (
    <Routes>
      <Route path='/onboarding'>
        <Route path='1' element={<Onboard1 />} />
        <Route path='2' element={<Onboard2 />} />
        <Route path='3' element={<Onboard3 />} />
      </Route>
      <Route path='/'>
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
