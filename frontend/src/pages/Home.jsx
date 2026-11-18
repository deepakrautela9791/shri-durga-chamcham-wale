import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-brand-maroon text-brand-cream py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-brand-gold">Shri Durga Chamcham Wale</h1>
          <p className="text-xl md:text-2xl mb-8">Authentic Mithai of Iglas - Swad wahi jo dil ko chhu jaye</p>
          <Link to="/sweets" className="bg-brand-gold text-brand-maroon font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-maroon mb-12">Our Specialities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-cream p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold mb-2 text-brand-maroon">Desi Ghee Sweets</h3>
              <p className="text-gray-700">Pure desi ghee se bani paramparik mithaiyan.</p>
            </div>
            <div className="bg-brand-cream p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold mb-2 text-brand-maroon">Famous Chamcham</h3>
              <p className="text-gray-700">Hamari signature mithai jiska koi muqabla nahi.</p>
            </div>
            <div className="bg-brand-cream p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold mb-2 text-brand-maroon">Festival Hampers</h3>
              <p className="text-gray-700">Khass tyoharon ke liye premium gift boxes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
