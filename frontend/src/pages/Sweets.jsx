import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { API_URL } from '../api';

const Sweets = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-brand-maroon mb-8">Our Premium Sweets</h1>
      {loading ? (
        <div className="text-center text-gray-600 py-12">Loading delicious sweets...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-600 py-12">No sweets available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sweets;
