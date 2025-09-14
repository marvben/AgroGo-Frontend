// context/Auth/AuthProvider.js
import { useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import Notification from '../../utils/Notification';
import useSnackbar from '../../hooks/useSnackbar';
import { getRemainingTime } from '../../utils/timeUtils';

import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser as deleteUserService,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  checkUrlValidity as checkUrlValidityService,
  uploadProfileImage as uploadProfileImageService,
  getProfile,
} from '../../services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('buyer');
  const [userUrl, setUserUrl] = useState('/dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [requiredRole, setRequiredRole] = useState(false);
  const [userHasRole, setUserHasRole] = useState(false);

  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const [hashTokenExpired, setHashTokenExpired] = useState(false);

  const { snack, setSnack, showSuccess, showError } = useSnackbar();

  // Load user profile on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile(userType);
        if (res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [userType]);

  // Auth actions
  const login = async (data) => {
    try {
      const { data: result } = await loginUser(userType, data);
      if (result?.user) {
        setUser(result.user);
        showSuccess('Login Successful');
        return true;
      }
      return false;
    } catch (err) {
      showError(err?.response?.data?.message || err.message);
      return false;
    }
  };

  const register = async (data) => {
    try {
      const { data: result } = await registerUser(userType, data);
      if (result?.user) {
        setUser(result.user);
        showSuccess(`Welcome ${result.user.name}, registration successful!`);
        return true;
      }
      return false;
    } catch (err) {
      showError(err?.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutUser(userType);
      setUser(null);
      setIsAuthenticated(false);
      showSuccess('Logged out successfully!');
      return true;
    } catch {
      showError('Logout failed');
      return false;
    }
  };

  const deleteUser = async () => {
    try {
      await deleteUserService(userType);
      setUser(null);
      setIsAuthenticated(false);
      showSuccess('User deleted successfully');
      return true;
    } catch (err) {
      showError('Failed to delete user: ' + err.message);
      return false;
    }
  };

  const forgotPassword = async (data) => {
    try {
      await forgotPasswordService(userType, data);
      showSuccess('Reset email sent');
      setHashTokenExpired(false);
      return true;
    } catch {
      showError('Unsuccessful, try again!');
      return false;
    }
  };

  const resetPassword = async (data, params) => {
    try {
      const { data: result } = await resetPasswordService(
        userType,
        params,
        data
      );
      if (result.success) {
        showSuccess('Password Update Successful');
        return true;
      }
      return false;
    } catch (err) {
      if (err?.response?.data?.expired) setHashTokenExpired(true);
      showError('Unsuccessful, Link expired');
      return false;
    }
  };

  const checkUrlValidity = async (params) => {
    try {
      const { data } = await checkUrlValidityService(userType, params);
      if (data.expired) {
        showError(data.message || 'Token expired');
        return true;
      }
      showSuccess(data.message || 'Link expires in 15mins');
      return false;
    } catch (err) {
      if (err?.response?.data?.expired) setHashTokenExpired(true);
      showError(err?.response?.data?.message || err.message);
      return false;
    }
  };

  const uploadImageToCloudinary = async (data, method) => {
    if (!data.image?.[0]) {
      showError('No image selected');
      return null;
    }
    const formData = new FormData();
    formData.append('profileImage', data.image[0]);

    try {
      const result = await uploadProfileImageService(
        userType,
        formData,
        method
      );
      showSuccess('Upload successful');
      return result.data;
    } catch (err) {
      showError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Something went wrong, image not uploaded'
      );
      return null;
    }
  };

  const resetExpireTime = () => {
    if (user?.verificationCodeExpires) {
      const { minutes, seconds } = getRemainingTime(
        user.verificationCodeExpires
      );
      showSuccess(`Time remaining: ${minutes}m ${seconds}s`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        deleteUser,
        forgotPassword,
        resetPassword,
        checkUrlValidity,
        uploadImageToCloudinary,
        resetExpireTime,
        userType,
        setUserType,
        userUrl,
        setUserUrl,
        isAuthenticated,
        setIsAuthenticated,
        requiredRole,
        setRequiredRole,
        userHasRole,
        setUserHasRole,
        showHeader,
        setShowHeader,
        showFooter,
        setShowFooter,
        hashTokenExpired,
        setHashTokenExpired,
        loading,
      }}
    >
      {children}
      <Notification snack={snack} setSnack={setSnack} />
    </CartContext.Provider>
  );
};
