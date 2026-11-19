import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-maroon text-center mb-12">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-brand-maroon mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-brand-cream p-3 rounded-full text-brand-maroon">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Our Address</h3>
                <p className="text-gray-600">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Shri+Durga+Chamcham+Wale,+Bus+Stand,+Mathura+Road,+Sarai+Bazar,+Iglas,+Uttar+Pradesh+202124"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-brand-maroon font-medium"
                  >
                    Shri Durga Chamcham Wale, Bus Stand, Mathura Road, Sarai Bazar, Iglas, Uttar Pradesh 202124
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-cream p-3 rounded-full text-brand-maroon">
                <FaPhoneAlt className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Phone Number</h3>
                <p className="text-gray-600">+91 9058576620</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <a
                href="https://wa.me/919058576620"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <FaWhatsapp className="text-2xl" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-maroon mb-6">Store Hours</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Monday - Sunday</span>
                <span className="font-semibold text-gray-800">7:00 AM - 10:00 PM</span>
              </div>
              <p className="text-sm text-gray-500 pt-2">
                We are open 7 days a week to serve you fresh and authentic sweets!
              </p>
            </div>
          </div>

          <div className="mt-8 bg-brand-cream/30 p-4 rounded-lg border border-brand-cream">
            <h3 className="font-bold text-brand-maroon mb-1">Bulk / Special Orders</h3>
            <p className="text-sm text-gray-600">
              Planning a wedding, festival celebration, or corporate event? Contact us on WhatsApp or call us directly for bulk orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
