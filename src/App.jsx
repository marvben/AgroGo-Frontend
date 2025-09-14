import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext/useAuth';
import AppNavbar from './components/Header/AppNavbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoardPage from './pages/DashBoardPage';
import VerificationPage from './pages/VerificationPage';
import ProtectedRoute from './Utils/ProtectedRoute';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
function App() {
  const { userUrl } = useAuth();

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/:productId' element={<ProductPage />} />

        <Route path={'/create-product'} element={<CreateProductPage />} />

        <Route
          path={'/edit-product/:productId'}
          element={
            <ProtectedRoute>
              <EditProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={userUrl}
          element={
            <ProtectedRoute>
              <DashBoardPage />
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
