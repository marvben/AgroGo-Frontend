import API from '../api/axios';

const imageUrl = 'https://picsum.photos/400/200';

const products = [
  {
    farmer: 'dummy user',
    title: 'Fresh Maize',
    description: 'High-quality yellow maize, perfect for porridge or grinding.',
    image: imageUrl,
    category: 'Grains',
    price: 1500,
    stock: 100,
  },
  {
    farmer: 'dummy user',
    title: 'Organic Soybeans',
    description: 'Non-GMO soybeans, ideal for making soy milk or tofu.',
    image: imageUrl,
    category: 'Legumes',
    price: 2000,
    stock: 50,
  },
  {
    farmer: 'dummy user',
    title: 'Red Sorghum',
    description: 'Nutritious red sorghum for porridge, baking, or brewing.',
    image: imageUrl,
    category: 'Grains',
    price: 1800,
    stock: 80,
  },
  {
    farmer: 'dummy user',
    title: 'Fresh Cassava',
    description: 'Sweet and soft cassava, perfect for fufu or garri.',
    image: imageUrl,
    category: 'Root Crops',
    price: 1200,
    stock: 200,
  },
  {
    farmer: 'dummy user',
    title: 'Ginger Roots',
    description: 'Spicy and fresh ginger roots for cooking or tea.',
    image: imageUrl,
    category: 'Spices',
    price: 2500,
    stock: 70,
  },
  {
    farmer: 'dummy user',
    title: 'Organic Tomatoes',
    description: 'Juicy red tomatoes, perfect for sauces and salads.',
    image: imageUrl,
    category: 'Vegetables',
    price: 1800,
    stock: 120,
  },
];

export default products;
