import { PrizeType } from '../types';
import { supabase } from '../lib/supabase';

export const validateSerialNumber = async (
  serialNumber: string,
  fullName: string,
  phoneNumber: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from('serial_numbers')
    .update({
      customer_name: fullName,
      customer_phone: phoneNumber,
      redeem_date: new Date().toISOString()
    })
    .eq('serial_number', serialNumber)
    .is('customer_name', null)
    .select()
    .single();

  if (error) return false;
  return !!data;
};

export const getPrizeDetails = async (serialNumber: string): Promise<PrizeType | null> => {
  const { data, error } = await supabase
    .from('serial_numbers')
    .select('prizes(*)')
    .eq('serial_number', serialNumber)
    .single();

  if (error || !data.prizes) return null;

  return {
    id: data.prizes.id,
    name: data.prizes.name,
    description: data.prizes.description,
    tier: data.prizes.tier,
    quantity: data.prizes.quantity,
    remainingQuantity: data.prizes.remaining_quantity
  };
};