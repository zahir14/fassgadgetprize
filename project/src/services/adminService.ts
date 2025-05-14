import { SerialNumberType, PrizeType } from '../types';
import { mockSerialNumbers, mockPrizes } from '../data/mockData';

// In a real application, these would be API calls to your backend

// Serial Number Management
export const getSerialNumbers = async (): Promise<SerialNumberType[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockSerialNumbers]);
    }, 500);
  });
};

export const updateSerialNumber = async (
  id: string,
  data: Partial<SerialNumberType>
): Promise<SerialNumberType> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockSerialNumbers.findIndex(s => s.id === id);
      
      if (index !== -1) {
        mockSerialNumbers[index] = {
          ...mockSerialNumbers[index],
          ...data
        };
        
        resolve(mockSerialNumbers[index]);
      } else {
        throw new Error('Serial number not found');
      }
    }, 500);
  });
};

export const deleteSerialNumber = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockSerialNumbers.findIndex(s => s.id === id);
      
      if (index !== -1) {
        mockSerialNumbers.splice(index, 1);
        resolve();
      } else {
        throw new Error('Serial number not found');
      }
    }, 500);
  });
};

export const generateSerialNumbers = async (count: number): Promise<SerialNumberType[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSerialNumbers: SerialNumberType[] = [];
      
      for (let i = 0; i < count; i++) {
        // Generate a random serial number
        const randomSerial = Array(10)
          .fill(0)
          .map(() => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            return chars.charAt(Math.floor(Math.random() * chars.length));
          })
          .join('');
        
        // Generate random prize from small/medium tiers  
        const eligiblePrizes = mockPrizes.filter(p => 
          p.tier !== 'big' && p.remainingQuantity > 0
        );
        
        let prizeId = '';
        let prizeName = '';
        let prizeTier = 'small';
        
        if (eligiblePrizes.length > 0) {
          const randomPrize = eligiblePrizes[
            Math.floor(Math.random() * eligiblePrizes.length)
          ];
          
          prizeId = randomPrize.id;
          prizeName = randomPrize.name;
          prizeTier = randomPrize.tier;
          
          // Update prize quantity
          const prizeIndex = mockPrizes.findIndex(p => p.id === randomPrize.id);
          if (prizeIndex !== -1) {
            mockPrizes[prizeIndex].remainingQuantity -= 1;
          }
        }
        
        const newSerialNumber: SerialNumberType = {
          id: `sn-${Date.now()}-${i}`,
          serialNumber: randomSerial,
          customerName: '',
          customerPhone: '',
          prizeId,
          prizeName,
          prizeTier,
          claimed: false,
          generatedDate: new Date().toISOString(),
          redeemDate: ''
        };
        
        newSerialNumbers.push(newSerialNumber);
        mockSerialNumbers.push(newSerialNumber);
      }
      
      resolve(newSerialNumbers);
    }, 800);
  });
};

// Prize Management
export const getPrizes = async (): Promise<PrizeType[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockPrizes]);
    }, 500);
  });
};

export const createPrize = async (
  data: Omit<PrizeType, 'id'>
): Promise<PrizeType> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPrize: PrizeType = {
        id: `prize-${Date.now()}`,
        ...data
      };
      
      mockPrizes.push(newPrize);
      resolve(newPrize);
    }, 500);
  });
};

export const updatePrize = async (
  id: string,
  data: Partial<Omit<PrizeType, 'id'>>
): Promise<PrizeType> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockPrizes.findIndex(p => p.id === id);
      
      if (index !== -1) {
        mockPrizes[index] = {
          ...mockPrizes[index],
          ...data
        };
        
        resolve(mockPrizes[index]);
      } else {
        throw new Error('Prize not found');
      }
    }, 500);
  });
};

export const deletePrize = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockPrizes.findIndex(p => p.id === id);
      
      if (index !== -1) {
        mockPrizes.splice(index, 1);
        resolve();
      } else {
        throw new Error('Prize not found');
      }
    }, 500);
  });
};

// Dashboard Stats
export const getStats = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const usedSerialNumbers = mockSerialNumbers.filter(s => s.customerName).length;
      const totalCustomers = new Set(
        mockSerialNumbers
          .filter(s => s.customerName)
          .map(s => s.customerName)
      ).size;
      
      const prizesGiven = mockSerialNumbers.filter(s => s.prizeId).length;
      
      const smallPrizes = mockSerialNumbers.filter(s => s.prizeTier === 'small').length;
      const mediumPrizes = mockSerialNumbers.filter(s => s.prizeTier === 'medium').length;
      const bigPrizes = mockSerialNumbers.filter(s => s.prizeTier === 'big').length;
      
      // Calculate top prizes
      const prizeCount: Record<string, number> = {};
      mockSerialNumbers.forEach(s => {
        if (s.prizeName) {
          prizeCount[s.prizeName] = (prizeCount[s.prizeName] || 0) + 1;
        }
      });
      
      const topPrizes = Object.entries(prizeCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      resolve({
        totalSerialNumbers: mockSerialNumbers.length,
        usedSerialNumbers,
        totalCustomers,
        prizesGiven,
        smallPrizes,
        mediumPrizes,
        bigPrizes,
        topPrizes
      });
    }, 700);
  });
};