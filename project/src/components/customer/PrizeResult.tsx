import React, { useState, useEffect } from 'react';
import { getPrizeDetails } from '../../services/prizeService';
import { PrizeType } from '../../types';
import confetti from 'canvas-confetti';
import { Gift, Trophy, Award } from 'lucide-react';

interface PrizeResultProps {
  serialNumber: string;
}

const PrizeResult: React.FC<PrizeResultProps> = ({ serialNumber }) => {
  const [prize, setPrize] = useState<PrizeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrize = async () => {
      try {
        const prizeData = await getPrizeDetails(serialNumber);
        setPrize(prizeData);
        
        // Trigger confetti if it's a big prize
        if (prizeData && prizeData.tier === 'big') {
          triggerConfetti();
        }
      } catch (err) {
        setError('Failed to load prize information. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrize();
  }, [serialNumber]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Checking your prize...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-center">
        <div className="text-red-500 text-xl mb-2">Error</div>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={() => window.location.href = '/check-prize'}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!prize) {
    return (
      <div className="bg-yellow-50 p-6 rounded-lg text-center">
        <div className="text-yellow-600 text-xl mb-2">No Prize Found</div>
        <p className="text-gray-700">We couldn't find a prize for this serial number. Please check if you entered the correct serial number.</p>
        <button 
          onClick={() => window.location.href = '/check-prize'}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white p-8 rounded-lg shadow-lg text-center transition-all duration-500 transform ${
      prize.tier === 'big' ? 'scale-105' : ''
    }`}>
      <div className="mb-6">
        {prize.tier === 'big' ? (
          <Trophy className="mx-auto text-yellow-500" size={64} />
        ) : prize.tier === 'medium' ? (
          <Award className="mx-auto text-blue-500" size={64} />
        ) : (
          <Gift className="mx-auto text-green-500" size={64} />
        )}
      </div>
      
      <h2 className={`text-2xl font-bold mb-4 ${
        prize.tier === 'big' 
          ? 'text-yellow-600' 
          : prize.tier === 'medium'
            ? 'text-blue-600'
            : 'text-green-600'
      }`}>
        Congratulations!
      </h2>
      
      <div className="mb-6">
        <div className="text-lg font-semibold">You've Won:</div>
        <div className={`text-3xl font-bold mt-2 mb-4 ${
          prize.tier === 'big' 
            ? 'text-yellow-600' 
            : prize.tier === 'medium'
              ? 'text-blue-600'
              : 'text-green-600'
        }`}>
          {prize.name}
        </div>
        <p className="text-gray-600">{prize.description}</p>
      </div>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-500 mb-1">Serial Number</div>
        <div className="text-lg font-mono">{serialNumber}</div>
      </div>
      
      <div className="text-sm text-gray-500 mt-6">
        <p>Please keep your serial number safe.</p>
        <p>Visit our store to claim your prize.</p>
      </div>
      
      <button 
        onClick={() => window.location.href = '/'}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PrizeResult;