import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-brand-maroon text-brand-gold p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About Shri Durga Chamcham Wale</h1>
          <p className="text-xl">Authentic taste of Iglas, Uttar Pradesh</p>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-brand-maroon mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Shri Durga Chamcham Wale is a traditional sweet shop located in the heart of Iglas. Managed by our family, we take immense pride in preserving the authentic taste of Indian mithai. Our journey started with a simple goal: to serve pure, delicious, and high-quality sweets to our community.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-maroon mb-4">The Traditional Way</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            What makes our sweets special? We believe in the old-school methods. Our famous Chamcham and other milk-based sweets are prepared on traditional wood-fired clay stoves (lakdi ki bhatti). This slow-cooking process gives our mithai a unique earthy flavor (sondhapan) that industrial boilers simply cannot match.
          </p>

          <h2 className="text-2xl font-bold text-brand-maroon mb-4">Our Quality Promise</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>100% Pure Desi Ghee preparations</li>
            <li>Fresh ingredients sourced locally</li>
            <li>No artificial preservatives</li>
            <li>Strict hygiene standards maintained</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default About;
