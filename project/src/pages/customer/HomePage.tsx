import React from 'react';
import { Link } from 'react-router-dom';
import { Gift } from 'lucide-react';
import Logo from '../../components/shared/Logo';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <Logo size="large" />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mt-6 mb-2">
            Tebus &amp; Menang
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Check if you've won amazing prizes with your FASS-Gadget purchase!
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Win Amazing Prizes</h2>
                <p className="mb-6">
                  Enter your serial number from your FASS-Gadget purchase and see what you've won instantly!
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    <span>Smartphones</span>
                  </li>
                  <li className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    <span>Tablets</span>
                  </li>
                  <li className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    <span>Smart Watches</span>
                  </li>
                  <li className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    <span>And many more!</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  How It Works
                </h2>
                <ol className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <div>
                      <p className="text-gray-700">Purchase any FASS-Gadget product from our stores</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <div>
                      <p className="text-gray-700">Find the serial number on your receipt</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <div>
                      <p className="text-gray-700">Enter your details and serial number on our website</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      4
                    </div>
                    <div>
                      <p className="text-gray-700">Discover your prize instantly!</p>
                    </div>
                  </li>
                </ol>
                <div className="mt-8">
                  <Link 
                    to="/check-prize" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
                  >
                    Check My Prize
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">Where do I find my serial number?</h3>
                <p className="text-gray-600">Your serial number is printed on your purchase receipt and product packaging.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">When does the promotion end?</h3>
                <p className="text-gray-600">The promotion runs until December 31, 2025. Check your prize before the deadline!</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">How do I claim my prize?</h3>
                <p className="text-gray-600">Visit any FASS-Gadget store with your serial number and identification to claim your prize.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">Can I enter multiple serial numbers?</h3>
                <p className="text-gray-600">Yes! Each valid purchase comes with its own serial number and chance to win.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} FASS-Gadget. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/admin/login" className="text-blue-500 hover:text-blue-700 mx-2">Admin Login</Link>
            <span className="mx-2">|</span>
            <a href="#" className="text-blue-500 hover:text-blue-700 mx-2">Terms & Conditions</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-blue-500 hover:text-blue-700 mx-2">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;