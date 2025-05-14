import { SerialNumberType, PrizeType } from '../types';
import { supabase } from '../lib/supabase';

// Serial Number Management
export const getSerialNumbers = async (): Promise<SerialNumberType[]> => {
  const { data, error } = await supabase
    .from('serial_numbers')
    .select('*, prizes(name, tier)')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(item => ({
    id: item.id,
    serialNumber: item.serial_number,
    customerName: item.customer_name || '',
    customerPhone: item.customer_phone || '',
    prizeId: item.prize_id,
    prizeName: item.prizes?.name || '',
    prizeTier: item.prizes?.tier || 'small',
    claimed: item.claimed,
    generatedDate: item.generated_date,
    redeemDate: item.redeem_date || ''
  }));
};

export const updateSerialNumber = async (
  id: string,
  data: Partial<SerialNumberType>
): Promise<SerialNumberType> => {
  const { data: updated, error } = await supabase
    .from('serial_numbers')
    .update({
      prize_id: data.prizeId,
      claimed: data.claimed,
      customer_name: data.customerName,
      customer_phone: data.customerPhone,
      redeem_date: data.redeemDate
    })
    .eq('id', id)
    .select('*, prizes(name, tier)')
    .single();

  if (error) throw error;

  return {
    id: updated.id,
    serialNumber: updated.serial_number,
    customerName: updated.customer_name || '',
    customerPhone: updated.customer_phone || '',
    prizeId: updated.prize_id,
    prizeName: updated.prizes?.name || '',
    prizeTier: updated.prizes?.tier || 'small',
    claimed: updated.claimed,
    generatedDate: updated.generated_date,
    redeemDate: updated.redeem_date || ''
  };
};

export const deleteSerialNumber = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('serial_numbers')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const generateSerialNumbers = async (count: number): Promise<SerialNumberType[]> => {
  const serialNumbers = Array(count).fill(0).map(() => ({
    serial_number: Array(10)
      .fill(0)
      .map(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return chars.charAt(Math.floor(Math.random() * chars.length));
      })
      .join('')
  }));

  const { data, error } = await supabase
    .from('serial_numbers')
    .insert(serialNumbers)
    .select('*, prizes(name, tier)');

  if (error) throw error;

  return data.map(item => ({
    id: item.id,
    serialNumber: item.serial_number,
    customerName: item.customer_name || '',
    customerPhone: item.customer_phone || '',
    prizeId: item.prize_id,
    prizeName: item.prizes?.name || '',
    prizeTier: item.prizes?.tier || 'small',
    claimed: item.claimed,
    generatedDate: item.generated_date,
    redeemDate: item.redeem_date || ''
  }));
};

// Prize Management
export const getPrizes = async (): Promise<PrizeType[]> => {
  const { data, error } = await supabase
    .from('prizes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    tier: item.tier,
    quantity: item.quantity,
    remainingQuantity: item.remaining_quantity
  }));
};

export const createPrize = async (
  data: Omit<PrizeType, 'id'>
): Promise<PrizeType> => {
  const { data: created, error } = await supabase
    .from('prizes')
    .insert({
      name: data.name,
      description: data.description,
      tier: data.tier,
      quantity: data.quantity,
      remaining_quantity: data.remainingQuantity
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: created.id,
    name: created.name,
    description: created.description,
    tier: created.tier,
    quantity: created.quantity,
    remainingQuantity: created.remaining_quantity
  };
};

export const updatePrize = async (
  id: string,
  data: Partial<Omit<PrizeType, 'id'>>
): Promise<PrizeType> => {
  const { data: updated, error } = await supabase
    .from('prizes')
    .update({
      name: data.name,
      description: data.description,
      tier: data.tier,
      quantity: data.quantity,
      remaining_quantity: data.remainingQuantity
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return {
    id: updated.id,
    name: updated.name,
    description: updated.description,
    tier: updated.tier,
    quantity: updated.quantity,
    remainingQuantity: updated.remaining_quantity
  };
};

export const deletePrize = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('prizes')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Dashboard Stats
export const getStats = async () => {
  const { data: serialNumbers, error: serialError } = await supabase
    .from('serial_numbers')
    .select('*, prizes(name, tier)');

  if (serialError) throw serialError;

  const usedSerialNumbers = serialNumbers.filter(s => s.customer_name).length;
  const totalCustomers = new Set(
    serialNumbers
      .filter(s => s.customer_name)
      .map(s => s.customer_name)
  ).size;

  const prizesGiven = serialNumbers.filter(s => s.prize_id).length;

  const smallPrizes = serialNumbers.filter(s => s.prizes?.tier === 'small').length;
  const mediumPrizes = serialNumbers.filter(s => s.prizes?.tier === 'medium').length;
  const bigPrizes = serialNumbers.filter(s => s.prizes?.tier === 'big').length;

  // Calculate top prizes
  const prizeCount: Record<string, number> = {};
  serialNumbers.forEach(s => {
    if (s.prizes?.name) {
      prizeCount[s.prizes.name] = (prizeCount[s.prizes.name] || 0) + 1;
    }
  });

  const topPrizes = Object.entries(prizeCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalSerialNumbers: serialNumbers.length,
    usedSerialNumbers,
    totalCustomers,
    prizesGiven,
    smallPrizes,
    mediumPrizes,
    bigPrizes,
    topPrizes
  };
};