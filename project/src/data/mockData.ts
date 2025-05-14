import { SerialNumberType, PrizeType } from '../types';

// Initial prize data
export const mockPrizes: PrizeType[] = [
  {
    id: 'prize-1',
    name: 'Smartphone',
    description: 'Latest model smartphone with premium features',
    tier: 'big',
    quantity: 5,
    remainingQuantity: 5
  },
  {
    id: 'prize-2',
    name: 'Tablet',
    description: 'High-performance tablet with large display',
    tier: 'big',
    quantity: 10,
    remainingQuantity: 10
  },
  {
    id: 'prize-3',
    name: 'Smartwatch',
    description: 'Fitness tracker with advanced health monitoring',
    tier: 'medium',
    quantity: 50,
    remainingQuantity: 45
  },
  {
    id: 'prize-4',
    name: 'Wireless Earbuds',
    description: 'Premium sound quality with noise cancellation',
    tier: 'medium',
    quantity: 100,
    remainingQuantity: 87
  },
  {
    id: 'prize-5',
    name: 'Power Bank',
    description: 'Fast-charging portable power bank',
    tier: 'small',
    quantity: 500,
    remainingQuantity: 432
  },
  {
    id: 'prize-6',
    name: 'Gadget Voucher',
    description: 'RM50 voucher for FASS-Gadget stores',
    tier: 'small',
    quantity: 1000,
    remainingQuantity: 897
  }
];

// Initial serial number data
export const mockSerialNumbers: SerialNumberType[] = [
  {
    id: 'sn-1',
    serialNumber: 'ABC1234567',
    customerName: 'John Doe',
    customerPhone: '0123456789',
    prizeId: 'prize-3',
    prizeName: 'Smartwatch',
    prizeTier: 'medium',
    claimed: true,
    generatedDate: '2025-01-15T08:30:00Z',
    redeemDate: '2025-01-20T14:45:00Z'
  },
  {
    id: 'sn-2',
    serialNumber: 'DEF7891234',
    customerName: 'Jane Smith',
    customerPhone: '0198765432',
    prizeId: 'prize-5',
    prizeName: 'Power Bank',
    prizeTier: 'small',
    claimed: false,
    generatedDate: '2025-01-16T09:15:00Z',
    redeemDate: '2025-01-21T11:30:00Z'
  },
  {
    id: 'sn-3',
    serialNumber: 'GHI4567890',
    customerName: '',
    customerPhone: '',
    prizeId: 'prize-1',
    prizeName: 'Smartphone',
    prizeTier: 'big',
    claimed: false,
    generatedDate: '2025-01-17T10:45:00Z',
    redeemDate: ''
  },
  {
    id: 'sn-4',
    serialNumber: 'JKL7890123',
    customerName: 'Ali Ahmad',
    customerPhone: '0134567890',
    prizeId: 'prize-6',
    prizeName: 'Gadget Voucher',
    prizeTier: 'small',
    claimed: true,
    generatedDate: '2025-01-18T11:30:00Z',
    redeemDate: '2025-01-22T15:15:00Z'
  },
  {
    id: 'sn-5',
    serialNumber: 'MNO1234567',
    customerName: 'Siti Ibrahim',
    customerPhone: '0187654321',
    prizeId: 'prize-4',
    prizeName: 'Wireless Earbuds',
    prizeTier: 'medium',
    claimed: false,
    generatedDate: '2025-01-19T12:15:00Z',
    redeemDate: '2025-01-23T10:00:00Z'
  },
  {
    id: 'sn-6',
    serialNumber: 'PQR7890123',
    customerName: '',
    customerPhone: '',
    prizeId: 'prize-5',
    prizeName: 'Power Bank',
    prizeTier: 'small',
    claimed: false,
    generatedDate: '2025-01-20T13:00:00Z',
    redeemDate: ''
  },
  {
    id: 'sn-7',
    serialNumber: 'STU4567890',
    customerName: 'Raj Kumar',
    customerPhone: '0123456789',
    prizeId: 'prize-6',
    prizeName: 'Gadget Voucher',
    prizeTier: 'small',
    claimed: true,
    generatedDate: '2025-01-21T14:30:00Z',
    redeemDate: '2025-01-24T09:45:00Z'
  },
  {
    id: 'sn-8',
    serialNumber: 'VWX1234567',
    customerName: '',
    customerPhone: '',
    prizeId: 'prize-3',
    prizeName: 'Smartwatch',
    prizeTier: 'medium',
    claimed: false,
    generatedDate: '2025-01-22T15:15:00Z',
    redeemDate: ''
  },
  {
    id: 'sn-9',
    serialNumber: 'YZA7890123',
    customerName: 'Mei Ling',
    customerPhone: '0198765432',
    prizeId: 'prize-2',
    prizeName: 'Tablet',
    prizeTier: 'big',
    claimed: false,
    generatedDate: '2025-01-23T16:00:00Z',
    redeemDate: '2025-01-25T13:30:00Z'
  },
  {
    id: 'sn-10',
    serialNumber: 'BCD4567890',
    customerName: '',
    customerPhone: '',
    prizeId: 'prize-5',
    prizeName: 'Power Bank',
    prizeTier: 'small',
    claimed: false,
    generatedDate: '2025-01-24T16:45:00Z',
    redeemDate: ''
  }
];