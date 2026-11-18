import { FaInstagram, FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-maroon text-brand-cream mt-auto pt-10 pb-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-brand-gold mb-4">Shri Durga Chamcham Wale</h3>
          <p className="mb-4">Premium authentic Indian sweets from the heart of Iglas.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-gold mb-4">Contact Us</h3>
          <p className="flex items-start gap-2 mb-2">
            <FaMapMarkerAlt className="mt-1 text-brand-gold" />
            <span>Bus Stand, Mathura Road ke pass, Iglas, UP 202124</span>
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-brand-gold" />
            <span>+91 9058576620</span>
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-gold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/sweets">Our Sweets</a></li>
            <li><a href="/contact">Track Order</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-red-900 text-center">
        <p className="mb-2">&copy; 2026 Shri Durga Chamcham Wale. All Rights Reserved.</p>
        <p className="font-medium text-brand-gold">Designed &amp; Developed with ❤️ by Deepak Kumar Rautela</p>
        <p className="text-sm text-brand-cream opacity-80 mt-1">Contact Developer: <a href="mailto:devbaghel9791@gmail.com" className="hover:text-brand-gold transition-colors">devbaghel9791@gmail.com</a></p>
      </div>
    </footer>
  );
};
export default Footer;
