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
                <h3 className="font-bold text-gray-900">Shop Address</h3>
                <p className="text-gray-600">Bus Stand, Mathura Road ke pass, <br/>Sarai Bazar, Iglas, <br/>Uttar Pradesh 202124</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-brand-cream p-3 rounded-full text-brand-maroon">
                <FaPhoneAlt className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 9058576620<br/>+91 9759328451</p>
              </div>
            </div>
            <div className="mt-8">
              <a href="#" className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                <FaWhatsapp className="text-2xl" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-brand-maroon mb-6">Store Hours</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between border-b pb-2">
              <span>Monday - Sunday</span>
              <span className="font-bold">8:00 AM - 9:00 PM</span>
            </div>
            <p className="pt-4 text-sm italic text-gray-500">
              * For bulk orders and festival hampers, please contact us at least 2 days in advance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
