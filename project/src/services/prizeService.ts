import { PrizeType } from '../types';
import { mockSerialNumbers, mockPrizes } from '../data/mockData';

// In a real application, these would be API calls to your backend

export const validateSerialNumber = async (
  serialNumber: string,
  fullName: string,
  phoneNumber: string
): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const serialNumberRecord = mockSerialNumbers.find(
        (s) => s.serialNumber === serialNumber && !s.customerName
      );
      
      if (serialNumberRecord) {
        // In a real app, this would update the server data
        serialNumberRecord.customerName = fullName;
        serialNumberRecord.customerPhone = phoneNumber;
        serialNumberRecord.redeemDate = new Date().toISOString();
        
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
};

export const getPrizeDetails = async (serialNumber: string): Promise<PrizeType | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const serialNumberRecord = mockSerialNumbers.find(
        (s) => s.serialNumber === serialNumber
      );
      
      if (serialNumberRecord && serialNumberRecord.prizeId) {
        const prize = mockPrizes.find(p => p.id === serialNumberRecord.prizeId);
        
        if (prize) {
          resolve(prize);
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    }, 1000);
  });
};