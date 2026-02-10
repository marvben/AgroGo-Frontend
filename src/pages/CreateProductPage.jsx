import ProductForm from '../components/Forms/ProductForms/ProductForm';
import { useProduct } from '../context/ProductContext/useProduct';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateProductPage() {
  const { addProduct } = useProduct();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateProduct = async (data, productImages) => {
    const productFullData = {
      ...data,
      images: productImages.filter((productImage) => productImage.secure_url && productImage.public_id),
    };
    setLoading(true);
    const ok = await addProduct(productFullData);
    setLoading(false);
    if (ok) {
      navigate('/products');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900 p-4'>
      <div className='w-full max-w-md bg-white p-6 rounded-2xl shadow-lg'>
        <ProductForm mode='create' onSubmit={handleCreateProduct} loading={loading} title='Create a new product' />
      </div>
    </div>
  );
}
