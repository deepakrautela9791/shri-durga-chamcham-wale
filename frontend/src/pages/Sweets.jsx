import ProductCard from '../components/ProductCard';

const Sweets = () => {
  const products = [
    { id: 1, name: "Famous Chamcham", pricePerKg: 300, description: "Our signature authentic sweet, freshly prepared." },
    { id: 2, name: "Kaju Katli", pricePerKg: 1100, description: "Premium quality cashew fudge with edible silver foil." },
    { id: 3, name: "Mawa Barfi", pricePerKg: 440, description: "Traditional sweet made from pure milk mawa." },
    { id: 4, name: "Mawa Peda", pricePerKg: 440, description: "Soft and grainy pedas made with fresh mawa." }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-brand-maroon mb-8">Our Premium Sweets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Sweets;
