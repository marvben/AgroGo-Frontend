import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext/useAuth';
import AppNavbar from './components/Header/AppNavbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoardPage from './pages/DashBoardPage';
import VerificationPage from './pages/VerificationPage';
import RoleRoute from './utils/RoleRoute';
import FarmerOnlyRoute from './utils/FarmerOnlyRoute';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import MyProductsPage from './pages/MyProductsPage';
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

        <Route
          path={'/create-product'}
          element={
            <FarmerOnlyRoute>
              <CreateProductPage />
            </FarmerOnlyRoute>
          }
        />

        <Route
          path={'/edit-product/:productId'}
          element={
            <FarmerOnlyRoute>
              <EditProductPage />
            </FarmerOnlyRoute>
          }
        />

        <Route
          path={userUrl}
          element={
            <RoleRoute allow={['viewer', 'customer', 'farmer', 'admin']}>
              <DashBoardPage />
            </RoleRoute>
          }
        />

        <Route
          path='/verify'
          element={
            <RoleRoute allow={['viewer', 'customer', 'farmer', 'admin']}>
              <VerificationPage />
            </RoleRoute>
          }
        />
        <Route
          path='/not-authorized'
          element={
            <RoleRoute allow={['viewer', 'customer', 'farmer', 'admin']}>
              <NotAuthorizedPage description='Only For Farmers' />
            </RoleRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />

        <Route
          path='/my-products'
          element={
            <RoleRoute allow={['farmer']}>
              <MyProductsPage />
            </RoleRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
