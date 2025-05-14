import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PrizeResult from '../../components/customer/PrizeResult';
import Logo from '../../components/shared/Logo';

const PrizeResultPage = () => {
  const { serialNumber } = useParams<{ serialNumber: string }>();
  
  if (!serialNumber) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Request</h1>
          <p className="text-gray-600 mb-6">No serial number provided.</p>
          <Link 
            to="/check-prize" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Go to Prize Check
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <Link to="/">
            <Logo size="medium" />
          </Link>
          <h1 className="text-3xl font-bold text-blue-800 mt-4">
            Your Prize Result
          </h1>
        </header>

        <div className="max-w-lg mx-auto">
          <PrizeResult serialNumber={serialNumber} />
          
          <div className="mt-12 text-center">
            <Link 
              to="/check-prize" 
              className="text-blue-600 hover:text-blue-800 mr-4"
            >
              Check Another Serial Number
            </Link>
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Home
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

export default PrizeResultPage;