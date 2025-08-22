import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashBoard from './pages/DashBoardPage';
import VerificationPage from './pages/VerificationPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import ProductPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';

function App() {
  const { userUrl } = useAuth();

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<ProductPage />} />

        <Route
          path={userUrl}
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/verify'
          element={
            <ProtectedRoute>
              <VerificationPage />
            </ProtectedRoute>
          }
        />
        <Route path='/not-authorized' element={<NotAuthorizedPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
