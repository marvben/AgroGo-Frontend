import { useState, useEffect } from 'react';
import API from '../api/axios';
import { AuthContext } from './AuthContext';
import { useForm } from 'react-hook-form';
import Notification from './Notification';

export const AuthProvider = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial auth check
  const [userType, setUserType] = useState('buyer'); // Default user type
  const [userUrl, setUserUrl] = useState('/dashboard');
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [requiredRole, setRequiredRole] = useState(false);
  const [userHasRole, setUserHasRole] = useState(false);
  const [hashTokenExpired, setHashTokenExpired] = useState(false);

  const { reset } = useForm();

  // Check if user is logged in on first load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/api/${userType}s/profile`, {
          withCredentials: true, // 🔑 this tells axios to send cookies
        }); // Backend should return { user }

        if (!res.data) {
          setUser(null);
          return;
        }
        setUser(res.data);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userType]);

  // Register function
  const register = async (data) => {
    try {
      const res = await API.post(`/api/${userType}s/register`, data, {
        withCredentials: true,
      });
      if (res.data) {
        const newUser = res.data.user;
        setUser(newUser);

        setSnack({
          open: true,
          type: 'success',
          msg: `Welcome ${newUser.name.toUpperCase()}, Registration successful!`,
        });

        return true;
      }
      return false;
    } catch (error) {
      setSnack({
        open: true,
        type: 'error',
        msg:
          error?.response?.data?.message ||
          error?.message ||
          'Registration failed',
      });

      return false;
    }
  };

  // Login function
  const login = async (data) => {
    try {
      const result = await API.post(`/api/${userType}s/login`, data, {
        withCredentials: true,
      });
      const { user: newUser } = result.data;

      if (newUser) {
        setUser(newUser);

        setSnack({
          open: true,
          type: 'success',
          msg: 'Login Successful',
        });
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      setSnack({
        open: true,
        type: 'error',
        msg:
          err?.response?.data?.message || err.message || 'Something went wrong',
      });
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    if (!user) return false; // already logged out, do nothing
    try {
      await API.post(`/api/${userType}s/logout`, {
        withCredentials: true,
      });

      setUser(null); // Clear user/token
      setSnack({
        open: true,
        type: 'success',
        msg: 'Logged out successfully!',
      });
      return true;
    } catch (error) {
      setSnack({ open: true, type: 'error', msg: 'Logout failed' });
      return false;
    }
  };

  // Delete user
  const deleteUser = async () => {
    try {
      await API.delete(`/api/${userType}s/delete`, {
        withCredentials: true,
      });

      return true;
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg: 'Failed to delete user' + err?.message,
      });

      return false;
    }
  };

  // function to check and update expire time
  const resetExpireTime = async () => {
    if (user) {
      const expiresAt = new Date(user.verificationCodeExpires);
      const now = new Date();
      const timeRemaining = expiresAt.getTime() - now.getTime(); // milliseconds left
      const minutes = Math.floor(timeRemaining / 60000); // 1 min = 60,000 ms
      const seconds = Math.floor((timeRemaining % 60000) / 1000);

      // Save remaining time in seconds (or ms depending on your use case)

      setSnack({
        open: true,
        type: 'success',
        msg: `Time remaining: ${minutes}m ${seconds}s`,
      });
    } else {
      return null;
    }
  };

  const forgotPassword = async (data) => {
    try {
      const res = await API.post(`/api/${userType}s/forgot-password`, data);
      if (res.data) {
        setSnack({
          open: true,
          type: 'success',
          msg: 'Reset email sent',
        });
        setHashTokenExpired(false);
        return true;
      }
      return false;
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg: 'Unsuccessful, try again!',
      });
      return false;
    }
  };

  const resetPassword = async (data, params) => {
    const url = `/api/${userType}s/reset-password/${params}`;
    console.log(url);

    try {
      const res = await API.patch(url, data);
      if (res.data.success) {
        setSnack({
          open: true,
          type: 'success',
          msg: 'Password Update Successful',
        });

        return true;
      }
      return false;
    } catch (err) {
      if (err?.response?.data?.expired) setHashTokenExpired(true);
      setSnack({
        open: true,
        type: 'error',
        msg: 'Unsuccessful, Link expired',
      });
      return false;
    }
  };

  const checkUrlValidity = async (params) => {
    const url = `/api/${userType}s/reset-password/${params}`;

    try {
      const res = await API.get(url);
      const { expired, message } = res.data;

      if (expired) {
        setSnack({
          open: true,
          type: 'error',
          msg: message || 'Token expired',
        });
        return expired;
      }

      setSnack({
        open: true,
        type: 'success',
        msg: message || 'Link expires in 15mins',
      });
      return expired;
    } catch (err) {
      if (err?.response?.data?.expired) setHashTokenExpired(true);
      setSnack({
        open: true,
        type: 'error',
        msg: err?.response?.data?.message || err.message,
      });
      return false;
    }
  };

  const uploadImageToCloudinary = async (data, method) => {
    if (!data.image?.[0]) {
      setSnack({ open: true, type: 'error', msg: 'No image selected' });
      return;
    }
    const formData = new FormData();
    formData.append('profileImage', data.image[0]); // matches multer field name
    console.log(data.image?.[0]);
    try {
      const result = await API[method](
        `/api/${userType}s/profileImage`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      if (result.data) {
        setSnack({
          open: true,
          type: 'success',
          msg: 'Upload successful',
        });
        reset();
        return result.data;
      }
      return null;
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg:
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Something went wrong, image not uploaded',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        uploadImageToCloudinary,
        logout,
        deleteUser,
        loading,
        userType,
        setUserType,
        userUrl,
        setUserUrl,
        resetExpireTime,
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
        forgotPassword,
        resetPassword,
        hashTokenExpired,
        setHashTokenExpired,
        checkUrlValidity,
      }}
    >
      {children}
      <Notification snack={snack} setSnack={setSnack} />
    </AuthContext.Provider>
  );
};
