import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-maroon mb-8 text-center">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4 text-gray-700">Your cart is empty.</p>
          <Link to="/sweets" className="bg-brand-gold text-brand-maroon font-bold px-6 py-2 rounded-full inline-block hover:bg-yellow-400">Shop Sweets</Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow border border-gray-200">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-4">
              <div>
                <h3 className="font-bold text-lg text-brand-maroon">{item.name}</h3>
                <p className="text-sm text-gray-600">Weight: {item.weight} | Qty: {item.qty}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg">₹{item.price}</span>
                <button onClick={() => removeFromCart(item.id, item.weight)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right mt-6">
            <h3 className="text-2xl font-bold text-gray-900">Total: ₹{getCartTotal()}</h3>
            <button className="bg-brand-maroon text-white font-bold py-3 px-8 rounded mt-4 hover:bg-red-800 w-full sm:w-auto">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
