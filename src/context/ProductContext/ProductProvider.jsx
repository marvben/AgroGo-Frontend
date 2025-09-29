// context/Auth/ProductProvider.js
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
} from '../../services/productService';

export const ProductProvider = ({ children }) => {
  const { snack, setSnack, showSuccess, showError } = useSnackbar();
  const [loading, setLoading] = useState(false);

  // Product actions
  const getManyProducts = async (params) => {
    try {
      const response = await fetchManyProducts(params);
      if (!response) throw new Error();
      return response.data;
    } catch (err) {
      showError('No product was found');
      return false;
    } finally {
      setLoading(false);
    }
  };
  const getProduct = async (productId) => {
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
    try {
      const { data: result } = await createProduct(data);
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
      const { data: result } = await updateProduct(formData);
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
  const removeProduct = async (productToDelete) => {
    try {
      const { data: result } = await deleteProduct(productToDelete);
      if (result?.success) {
        showSuccess(result?.product?.title?.toUpperCase() + ' Deleted!');
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
    <ProductContext.Provider
      value={{
        loading,
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
    </ProductContext.Provider>
  );
};
