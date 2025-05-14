import React, { useState, useEffect } from 'react';
import { SerialNumberType } from '../../types';
import { getPrizes } from '../../services/adminService';
import { PrizeType } from '../../types';

interface SerialNumberFormProps {
  serialNumber: SerialNumberType | null;
  onSubmit: (data: Partial<SerialNumberType>) => void;
  onCancel: () => void;
}

const SerialNumberForm: React.FC<SerialNumberFormProps> = ({
  serialNumber,
  onSubmit,
  onCancel
}) => {
  const [prizeId, setPrizeId] = useState('');
  const [isBigPrize, setIsBigPrize] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [prizes, setPrizes] = useState<PrizeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const data = await getPrizes();
        setPrizes(data);
      } catch (error) {
        console.error('Failed to load prizes', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrizes();
  }, []);

  useEffect(() => {
    if (serialNumber) {
      setPrizeId(serialNumber.prizeId || '');
      setIsBigPrize(serialNumber.prizeTier === 'big');
      setClaimed(serialNumber.claimed);
    }
  }, [serialNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPrize = prizes.find(p => p.id === prizeId);
    
    onSubmit({
      prizeId,
      prizeName: selectedPrize?.name || '',
      prizeTier: isBigPrize ? 'big' : (selectedPrize?.tier || 'small'),
      claimed
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="w-8 h-8 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Serial Number
          </label>
        </div>
        <div className="mt-1">
          <input
            type="text"
            disabled
            className="block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={serialNumber?.serialNumber || ''}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="prize" className="block text-sm font-medium text-gray-700">
          Assigned Prize
        </label>
        <select
          id="prize"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          value={prizeId}
          onChange={(e) => setPrizeId(e.target.value)}
        >
          <option value="">Select a prize</option>
          {prizes.map((prize) => (
            <option key={prize.id} value={prize.id}>
              {prize.name} ({prize.tier})
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center">
        <input
          id="bigPrize"
          name="bigPrize"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={isBigPrize}
          onChange={(e) => setIsBigPrize(e.target.checked)}
        />
        <label htmlFor="bigPrize" className="ml-2 block text-sm text-gray-900">
          Flag as Big Prize
        </label>
      </div>
      
      <div className="flex items-center">
        <input
          id="claimed"
          name="claimed"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={claimed}
          onChange={(e) => setClaimed(e.target.checked)}
        />
        <label htmlFor="claimed" className="ml-2 block text-sm text-gray-900">
          Mark as Claimed
        </label>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SerialNumberForm;