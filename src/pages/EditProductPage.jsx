import ProductForm from '../components/Forms/ProductForms/ProductForm';
import { useAuth } from '../context/AuthContext/useAuth';
import { useProduct } from '../context/ProductContext/useProduct';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
  const { user } = useAuth();
  const { getProduct, updateProduct } = useProduct();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const product = await getProduct(productId);
        if (product) {
          setInitialData(product);
        }
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [productId, getProduct]);

  const handleUpdateProduct = async (data, productImages) => {
    const productFullData = {
      ...data,
      images: productImages.filter((productImage) => productImage.secure_url && productImage.public_id),
    };

    setLoading(true);
    const ok = await updateProduct(productId, productFullData);
    setLoading(false);

    if (ok) {
      navigate('/dashboard/products');
    }
  };

  if (fetching) {
    return (
      <div className='flex h-screen items-center justify-center bg-muted/30'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted/30 p-4'>
      <div className='w-full max-w-3xl'>
        <ProductForm mode='edit' initialData={initialData} onSubmit={handleUpdateProduct} loading={loading} title='Edit Product' />
      </div>
    </div>
  );
}
