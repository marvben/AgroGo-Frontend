import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext/useAuth';
import AppNavbar from './components/Header/AppNavbar';
import BottomNav from './components/Navigation/BottomNav';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoardPage from './pages/DashBoardPage';
import VerificationPage from './pages/VerificationPage';
import RoleRoute from './utils/RoleRoute';
import FarmerOnlyRoute from './utils/FarmerOnlyRoute';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import MyProductsPage from './pages/MyProductsPage';
import BankDetailsPage from './pages/BankDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import DashboardLayout from './components/Layout/DashboardLayout';
import UsersPage from './pages/admin/UsersPage';
import OrdersPage from './pages/admin/OrdersPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import TagsPage from './pages/admin/TagsPage';
import SettingsPage from './pages/SettingsPage';
import { Toaster } from 'sonner';

function App() {
  const { userUrl } = useAuth();
  const location = useLocation();

  // Define routes where Navbar/Footer should be hidden (e.g., Dashboard)
  const hideLayoutPaths = ['/dashboard', '/login', '/register', '/payment-confirmation'];
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || location.pathname === '/payment-confirmation';

  return (
    <>
      {!isDashboardRoute && <AppNavbar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/:productId' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/payment-confirmation' element={<PaymentConfirmationPage />} />

        {/* Dashboard Routes wrapped in Layout */}
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route
            index
            element={
              <RoleRoute allow={['viewer', 'customer', 'farmer', 'admin']}>
                <DashBoardPage />
              </RoleRoute>
            }
          />
          <Route
            path='create-product'
            element={
              <FarmerOnlyRoute>
                <CreateProductPage />
              </FarmerOnlyRoute>
            }
          />
          <Route
            path='edit-product/:productId'
            element={
              <FarmerOnlyRoute>
                <EditProductPage />
              </FarmerOnlyRoute>
            }
          />
          <Route
            path='products'
            element={
              <RoleRoute allow={['farmer']}>
                <MyProductsPage />
              </RoleRoute>
            }
          />
          <Route
            path='categories'
            element={
              <RoleRoute allow={['admin']}>
                <CategoriesPage />
              </RoleRoute>
            }
          />
          <Route
            path='tags'
            element={
              <RoleRoute allow={['admin']}>
                <TagsPage />
              </RoleRoute>
            }
          />
          <Route
            path='settings'
            element={
              <RoleRoute allow={['admin', 'farmer', 'customer']}>
                <SettingsPage />
              </RoleRoute>
            }
          />
          <Route
            path='bank-details'
            element={
              <FarmerOnlyRoute>
                <BankDetailsPage />
              </FarmerOnlyRoute>
            }
          />
          <Route
            path='users'
            element={
              <RoleRoute allow={['admin']}>
                <UsersPage />
              </RoleRoute>
            }
          />
          <Route
            path='orders'
            element={
              <RoleRoute allow={['admin', 'farmer']}>
                <OrdersPage />
              </RoleRoute>
            }
          />
        </Route>

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

        {/* Policy Pages */}
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/terms' element={<TermsPage />} />
        <Route path='/privacy' element={<PrivacyPolicyPage />} />
      </Routes>
      {!isDashboardRoute && <Footer />}
      {!isDashboardRoute && <BottomNav />}
      <Toaster position='top-right' richColors closeButton />
    </>
  );
}

export default App;
