import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSerialNumber } from '../../services/prizeService';

const PrizeCheckForm = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number is required';
    } else if (!/^[A-Z0-9]{10}$/.test(serialNumber)) {
      newErrors.serialNumber = 'Serial number must be 10 alphanumeric characters';
    }
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10,12}$/.test(phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const isValid = await validateSerialNumber(serialNumber, fullName, phoneNumber);
      
      if (isValid) {
        navigate(`/prize-result/${serialNumber}`);
      } else {
        setErrors({
          serialNumber: 'Invalid serial number. Please check and try again.'
        });
      }
    } catch (error) {
      setErrors({
        form: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-all duration-300 hover:shadow-xl"
      >
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="serialNumber"
          >
            Serial Number
          </label>
          <input
            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.serialNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
            id="serialNumber"
            type="text"
            placeholder="Enter your serial number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
            maxLength={10}
          />
          {errors.serialNumber && (
            <p className="text-red-500 text-xs italic mt-1">{errors.serialNumber}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs italic mt-1">{errors.fullName}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.phoneNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        
        {errors.form && (
          <div className="mb-6 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
            {errors.form}
          </div>
        )}
        
        <div className="flex items-center justify-center">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 flex items-center justify-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isSubmitting ? 'Checking...' : 'Check My Prize'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrizeCheckForm;