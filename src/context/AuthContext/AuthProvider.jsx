import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useUI } from '../UIContext/useUI';
import getRemainingTime from '../../utils/getRemainingTime';

import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser as deleteUserService,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  checkUrlValidity as checkUrlValidityService,
  getProfile,
} from '../../services/authService';

import {
  uploadProfileImage as uploadProfileImageService,
  deleteProfileImage as deleteProfileImageService,
} from '../../services/imageService.js';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(true);

  const [userUrl, setUserUrl] = useState('/dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [requiredRole, setRequiredRole] = useState(false);
  const [userHasRole, setUserHasRole] = useState(false);

  const [hashTokenExpired, setHashTokenExpired] = useState(false);

  const { showSuccess, showError } = useUI();

  // Load user profile on mount
  useEffect(() => {
    const storedUser = async () => {
      try {
        const res = await getProfile();
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
    };

    storedUser();
    return () => setUser(null);
  }, []);

  // Auth actions
  const login = async (data) => {
    try {
      const { data: result } = await loginUser(data);
      if (result?.user) {
        setUser(result.user);
        showSuccess('Login Successful');
        return true;
      }
      return false;
    } catch (err) {
      const errorMessages = err?.response?.data?.details?.map(
        (message) => message
      );
      showError(
        errorMessages ||
          err?.response?.data?.message ||
          err.message ||
          'Unable to login'
      );
      return false;
    }
  };

  const register = async (data) => {
    try {
      const { data: result } = await registerUser(data);
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
      const result = await logoutUser();
      if (result?.data?.success) {
        navigate('/');
        setUser(null);
        setIsAuthenticated(false);
        showSuccess('Logged out successfully!');
      }

      return true;
    } catch {
      showError('Logout failed');
      window.location.href = '/dashboard';
      return false;
    }
  };

  const deleteUser = async () => {
    try {
      await deleteUserService();
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
      await forgotPasswordService(data);
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
      const { data: result } = await resetPasswordService(params, data);
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
      const { data } = await checkUrlValidityService(params);
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

  const uploadProfileImage = async (data) => {
    try {
      const result = await uploadProfileImageService(data);
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

  const deleteProfileImage = async () => {
    try {
      const result = await deleteProfileImageService();
      showSuccess('Image deleted successfully');
      return result.data.success;
    } catch (err) {
      showError('Something went wrong, image not deleted');
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
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        deleteUser,
        forgotPassword,
        resetPassword,
        checkUrlValidity,
        uploadProfileImage,
        deleteProfileImage,
        resetExpireTime,
        userUrl,
        setUserUrl,
        role,
        setRole,
        isAuthenticated,
        setIsAuthenticated,
        requiredRole,
        setRequiredRole,
        userHasRole,
        setUserHasRole,
        hashTokenExpired,
        setHashTokenExpired,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

///////////////////////////////////////////////////////////////

//   // Load user profile on mount
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const res = await getProfile();
//         if (res.data) {
//           setUser(res.data);
//           setIsAuthenticated(true);
//         }
//       } catch {
//         setUser(null);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkSession();
//   }, []);

//   // Auth actions
//   const login = async (data) => {
//     const { data: result } = await loginUser(data);
//     if (result?.user) {
//       setUser(result.user);
//       setIsAuthenticated(true);
//       return result.user;
//     }
//     return null;
//   };

//   const register = async (data) => {
//     const { data: result } = await registerUser(data);
//     if (result?.user) {
//       setUser(result.user);
//       setIsAuthenticated(true);
//       return result.user;
//     }
//     return null;
//   };

//   const logout = async () => {
//     await logoutUser();
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   const deleteUser = async () => {
//     await deleteUserService();
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   const forgotPassword = async (data) => {
//     await forgotPasswordService(data);
//     setHashTokenExpired(false);
//   };

//   const resetPassword = async (data, params) => {
//     const { data: result } = await resetPasswordService(params, data);
//     if (result.success) return true;
//     return false;
//   };

//   const checkUrlValidity = async (params) => {
//     const { data } = await checkUrlValidityService(params);
//     if (data.expired) {
//       return false;
//     }
//     return true;
//   };

//   const uploadImageToCloudinary = async (data, method) => {
//     if (!data.image?.[0]) return null;
//     const formData = new FormData();
//     formData.append('profileImage', data.image[0]);
//     const result = await uploadProfileImageService(formData, method);
//     return result.data;
//   };

//   const resetExpireTime = () => {
//     if (user?.verificationCodeExpires) {
//       return getRemainingTime(user.verificationCodeExpires);
//     }
//     return null;
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         register,
//         logout,
//         deleteUser,
//         forgotPassword,
//         resetPassword,
//         checkUrlValidity,
//         uploadImageToCloudinary,
//         resetExpireTime,
//         userUrl,
//         setUserUrl,
//         role,
//         setRole,
//         isAuthenticated,
//         setIsAuthenticated,
//         requiredRole,
//         setRequiredRole,
//         userHasRole,
//         setUserHasRole,
//         hashTokenExpired,
//         setHashTokenExpired,
//         loading,
//       }}
//     >
//       {children}
//       <Notification snack={snack} setSnack={setSnack} />
//     </AuthContext.Provider>
//   );
// };
