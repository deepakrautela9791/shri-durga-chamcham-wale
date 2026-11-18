import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [weight, setWeight] = useState('1kg');
  const [qty, setQty] = useState(1);

  const calculatePrice = () => {
    let basePrice = product.pricePerKg;
    if (weight === '500g') basePrice = basePrice / 2;
    if (weight === '250g') basePrice = basePrice / 4;
    return basePrice * qty;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Image: {product.name}</span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-brand-maroon mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="text-2xl font-bold text-gray-900 mb-3">₹{calculatePrice()}</div>

        <div className="flex justify-between items-center mb-4">
          <select
            className="border rounded p-1 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-brand-maroon"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          >
            <option value="250g">250g</option>
            <option value="500g">500g</option>
            <option value="1kg">1 kg</option>
          </select>
          <div className="flex items-center border rounded">
            <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span className="px-3 text-sm">{qty}</span>
            <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200" onClick={() => setQty(qty + 1)}>+</button>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-brand-maroon text-white py-2 rounded font-semibold hover:bg-red-800 transition-colors text-sm">Add to Cart</button>
          <button className="flex-1 bg-brand-gold text-brand-maroon py-2 rounded font-semibold hover:bg-yellow-400 transition-colors text-sm">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
