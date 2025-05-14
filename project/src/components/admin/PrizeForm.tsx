import React, { useState, useEffect } from 'react';
import { PrizeType } from '../../types';

interface PrizeFormProps {
  prize?: PrizeType | null;
  onSubmit: (prizeData: Omit<PrizeType, 'id'>) => void;
  onCancel: () => void;
}

const PrizeForm: React.FC<PrizeFormProps> = ({ 
  prize, 
  onSubmit, 
  onCancel 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tier, setTier] = useState<'small' | 'medium' | 'big'>('small');
  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (prize) {
      setName(prize.name);
      setDescription(prize.description);
      setTier(prize.tier);
      setQuantity(prize.quantity);
    }
  }, [prize]);

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Prize name is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onSubmit({
      name,
      description,
      tier,
      quantity,
      remainingQuantity: prize ? prize.remainingQuantity : quantity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Prize Name
        </label>
        <input
          type="text"
          id="name"
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="tier" className="block text-sm font-medium text-gray-700">
          Prize Tier
        </label>
        <select
          id="tier"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          value={tier}
          onChange={(e) => setTier(e.target.value as 'small' | 'medium' | 'big')}
        >
          <option value="small">Small Prize</option>
          <option value="medium">Medium Prize</option>
          <option value="big">Big Prize</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.quantity ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
        )}
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
          {prize ? 'Update Prize' : 'Add Prize'}
        </button>
      </div>
    </form>
  );
};

export default PrizeForm;