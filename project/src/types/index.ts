// Prize Type
export interface PrizeType {
  id: string;
  name: string;
  description: string;
  tier: 'small' | 'medium' | 'big';
  quantity: number;
  remainingQuantity: number;
}

// Serial Number Type
export interface SerialNumberType {
  id: string;
  serialNumber: string;
  customerName: string;
  customerPhone: string;
  prizeId: string;
  prizeName: string;
  prizeTier: 'small' | 'medium' | 'big';
  claimed: boolean;
  generatedDate: string;
  redeemDate: string;
}