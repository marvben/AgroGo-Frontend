import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import API from '../api/axios';
import { AuthContext } from './AuthContext';
import { Box, Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';

export const AuthProvider = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial auth check
  const [userType, setUserType] = useState('buyer'); // Default user type
  const [userUrl, setUserUrl] = useState('/dashboard');
  const [expireTime, setExpireTime] = useState(null); // Optional: to track code expiration
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [requiredRole, setRequiredRole] = useState(false);
  const [userHasRole, setUserHasRole] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
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

  useEffect(() => {
    const token = Cookies.get('token'); // read token from cookies
    if (token) {
      setUserToken(token);
    }
  }, []); // runs once when app loads

  // function to check and update expire time
  const resetExpireTime = async () => {
    if (user && user.verificationCodeExpires) {
      const expiresAt = new Date(user.verificationCodeExpires);
      const now = new Date();
      const timeRemaining = expiresAt.getTime() - now.getTime(); // milliseconds left
      const minutes = Math.floor(timeRemaining / 60000); // 1 min = 60,000 ms
      const seconds = Math.floor((timeRemaining % 60000) / 1000);

      // Save remaining time in seconds (or ms depending on your use case)
      setExpireTime(`Time remaining: ${minutes}m ${seconds}s`);
    } else {
      setExpireTime(null);
    }
  };

  // Register function
  const register = async (data) => {
    try {
      const res = await API.post(`/api/${userType}s/register`, data, {
        withCredentials: true,
      });
      if (res.data) {
        const newUser = res.data.user;
        const newToken = newUser.tokens[0].token;
        setUser(newUser);

        setSnack({
          open: true,
          type: 'success',
          msg: `Welcome ${newUser.name}, Registration successful!`,
        });

        // Set the token in cookies
        setUserToken(newToken);

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
      console.log(error);
      return false;
    }
  };

  const uploadImageToCloudinary = async (data, method) => {
    const formData = new FormData();
    formData.append('profileImage', data.image[0]); // matches multer field name

    try {
      const res = await API[method](
        `/api/${user.role}s/profileImage`,
        formData
      );

      setProfileImage(res.data);
      setSnack({
        open: true,
        type: 'success',
        msg: method === 'post' ? 'Upload successful' : 'Update successful',
      });
      reset();
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg:
          err.response?.data?.error ||
          'Something went wrong, image not uploaded',
      });
    }
  };

  // Login function
  const login = async (data) => {
    try {
      const res = await API.post(`/api/${userType}s/login`, data, {
        withCredentials: true,
      });

      if (res.data) {
        // Set the token in cookies
        setUserToken(res.data.token);
        setUser(res.data.user);
        setSnack({
          open: true,
          type: 'success',
          msg: 'Login Successful',
        });
        return true;
      }
      return false;
    } catch (err) {
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
    try {
      const res = await API.post(`/api/${userType}s/logout`, {
        withCredentials: true,
      }); // Backend should clear cookie
      console.log('Logout response:', res.data);
      Cookies.remove('token');
      return true;
    } catch (error) {
      setSnack({
        open: true,
        type: 'error',
        msg: error?.response?.data?.message || 'Logout failed',
      });
      return false;
    }
  };

  // Delete user
  const deleteUser = async () => {
    try {
      await API.delete(`/api/${userType}s/delete`, {
        withCredentials: true,
      });
      Cookies.remove('token');
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
        userToken,
        setUserToken,
        expireTime,
        setExpireTime,
        resetExpireTime,
        isAuthenticated,
        setIsAuthenticated,
        requiredRole,
        setRequiredRole,
        userHasRole,
        setUserHasRole,
        showHeader,
        setShowHeader,
      }}
    >
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.type}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};
