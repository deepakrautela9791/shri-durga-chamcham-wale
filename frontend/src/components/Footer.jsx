import React from 'react';
import { Link } from 'react-router-dom';
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
            <FaMapMarkerAlt className="mt-1 text-brand-gold flex-shrink-0" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Shri+Durga+Chamcham+Wale,+Bus+Stand,+Mathura+Road,+Sarai+Bazar,+Iglas,+Uttar+Pradesh+202124"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Bus Stand, Mathura Road ke pass, Iglas, UP 202124
            </a>
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-brand-gold flex-shrink-0" />
            <span>+91 9058576620</span>
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-gold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-brand-gold transition">Home</Link></li>
            <li><Link to="/sweets" className="hover:text-brand-gold transition">Sweets</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition">Contact</Link></li>
            <li><Link to="/track-order" className="hover:text-brand-gold transition">Track Order</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-red-900 mt-8 pt-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Shri Durga Chamcham Wale. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
