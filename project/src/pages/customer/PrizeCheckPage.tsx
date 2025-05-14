import React from 'react';
import { Link } from 'react-router-dom';
import PrizeCheckForm from '../../components/customer/PrizeCheckForm';
import Logo from '../../components/shared/Logo';

const PrizeCheckPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <Link to="/">
            <Logo size="medium" />
          </Link>
          <h1 className="text-3xl font-bold text-blue-800 mt-4">
            Check Your Prize
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your details below to see what you've won
          </p>
        </header>

        <div className="max-w-lg mx-auto">
          <PrizeCheckForm />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Can't find your serial number?
            </p>
            <p className="text-sm text-gray-600">
              The serial number can be found on your purchase receipt or product packaging.
              If you're having trouble, please contact our customer support.
            </p>
            
            <Link 
              to="/" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} FASS-Gadget. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrizeCheckPage;