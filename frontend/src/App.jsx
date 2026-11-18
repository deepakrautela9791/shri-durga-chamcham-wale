import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-brand-cream font-sans">
        <header className="bg-brand-maroon text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-brand-gold">Shri Durga Chamcham Wale</h1>
            <nav className="space-x-4">
              <a href="/" className="hover:text-brand-gold font-semibold">Home</a>
              <a href="/sweets" className="hover:text-brand-gold font-semibold">Sweets</a>
              <a href="/cart" className="hover:text-brand-gold font-semibold">Cart</a>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto p-4 mt-8">
          <h2 className="text-4xl text-center text-brand-maroon font-bold mb-4">Premium Indian Sweets</h2>
          <p className="text-center text-gray-800 text-lg">Authentic taste of Iglas, now delivered to your doorsteps!</p>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
