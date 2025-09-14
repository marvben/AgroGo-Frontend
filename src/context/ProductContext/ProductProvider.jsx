// context/Auth/AuthProvider.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from './ProductContext';
import Notification from '../../utils/Notification';
import useSnackbar from '../../hooks/useSnackbar';

import {
  fetchManyProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
} from '../../services/authService';

export const AuthProvider = ({ children }) => {
  const { productId } = useParams();
  const { snack, setSnack, showSuccess, showError } = useSnackbar();

  // Product actions
  const getManyProducts = async (params) => {
    try {
      const { data: result } = await fetchManyProducts(params);
      if (result?.products > 0) return result.products;

      return false;
    } catch (err) {
      showError('No product was found');
      return false;
    } finally {
      setLoading(false);
    }
  };
  const getProduct = async () => {
    try {
      const { data: result } = await fetchProduct(productId);
      if (result?.success) return result.product;

      return false;
    } catch (err) {
      showError('No product was found');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    if (!data.image?.[0]) {
      showError('No image selected');
      return null;
    }
    const formData = new FormData();
    formData.append('productImage', data.image[0]);

    try {
      const { data: result } = await createProduct(data, formData);
      if (result?.success) {
        showSuccess(`New Product created`);
        return true;
      }
      return false;
    } catch (err) {
      showError(err?.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (data) => {
    if (!data.image?.[0]) {
      showError('No image selected');
      return null;
    }
    const formData = new FormData();
    formData.append('productImage', data.image[0]);

    try {
      const { data: result } = await updateProduct(productId, data, formData);
      if (result?.success) {
        showSuccess(`Update successful`);
        return true;
      }
      return false;
    } catch (err) {
      showError(err?.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const removeProduct = async () => {
    try {
      const { data: result } = await deleteProduct(productId);
      if (result?.success) {
        showSuccess(`Product Deleted`);
        return true;
      }
      return false;
    } catch (err) {
      showError(err?.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeManyProducts = async (data) => {
    try {
      const { data: result } = await deleteManyProducts(data);
      if (result?.success) {
        showSuccess(`Product Deleted`);
        return true;
      }
      return false;
    } catch (err) {
      showError(err?.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getManyProducts,
        getProduct,
        addProduct,
        editProduct,
        removeProduct,
        removeManyProducts,
      }}
    >
      {children}
      <Notification snack={snack} setSnack={setSnack} />
    </AuthContext.Provider>
  );
};
