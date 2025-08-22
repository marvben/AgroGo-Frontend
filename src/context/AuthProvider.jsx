import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import API from '../api/axios';
import { AuthContext } from './AuthContext';
import { Box, Snackbar, Alert } from '@mui/material';

const tokenInCookie = Cookies.get('token');

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(tokenInCookie || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial auth check
  const [userType, setUserType] = useState('buyer'); // Default user type
  const [userUrl, setUserUrl] = useState(null);
  const [expireTime, setExpireTime] = useState(null); // Optional: to track code expiration
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [requiredRole, setRequiredRole] = useState(false);
  const [userHasRole, setUserHasRole] = useState(false);

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
        setUserUrl(`/${userType}s/${res.data._id}`);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userType]);

  // function to check and update expire time
  const resetExpireTime = async () => {
    let intervalID = null;
    if (user && user.verificationCodeExpires) {
      // set up interval to check every 1 second
      intervalID = setInterval(resetExpireTime, 1000);
      const expiresAt = new Date(user.verificationCodeExpires);
      const now = new Date();
      const timeRemaining = expiresAt.getTime() - now.getTime(); // milliseconds left
      const minutes = Math.floor(timeRemaining / 60000); // 1 min = 60,000 ms
      const seconds = Math.floor((timeRemaining % 60000) / 1000);

      // Save remaining time in seconds (or ms depending on your use case)
      setExpireTime(`Time remaining: ${minutes}m ${seconds}s`);
    } else {
      setExpireTime(null);
      clearInterval(intervalID); // Clear interval if no expiration time
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
        if (!userToken) setUserToken(tokenInCookie);
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Register function
  const register = async (data) => {
    try {
      const res = await API.post(`/api/${userType}s/register`, data, {
        withCredentials: true,
      });
      if (res.data) {
        setUser(res.data.user);
        setExpireTime(user.verificationCodeExpires); // Optional: set expiration time if provided
        console.log('User registered:', res.data);
        console.log('Registration successful');

        // Set the token in cookies
        if (!userToken) setUserToken(tokenInCookie);

        return true;
      }
      return false;
    } catch (error) {
      setSnack({
        open: true,
        type: 'error',
        msg: error?.response?.data?.message || 'Registration failed',
      });
      console.error(error);
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
