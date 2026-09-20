export interface CategoryDatum {
  label: string;
  count: number;
  shortLabel: string;
}

export interface TransactionScrap {
  label: string;
  count: number;
  rotation: number;
}

export const transactionStats = {
  total: 2461,
  yearRange: '2015—2018',
  food: 907,
  transportation: 307,
  household: 176,
  subscription: 143,
};

export const categories: CategoryDatum[] = [
  { label: 'Food', count: 907, shortLabel: 'FOOD' },
  { label: 'Transportation', count: 307, shortLabel: 'TRANSIT' },
  { label: 'Household', count: 176, shortLabel: 'HOUSE' },
  { label: 'Subscription', count: 143, shortLabel: 'SUBS' },
  { label: 'Investment', count: 98, shortLabel: 'INVEST' },
  { label: 'Transfer', count: 76, shortLabel: 'TRANSFER' },
  { label: 'Recurring Deposit', count: 54, shortLabel: 'RECUR' },
  { label: 'Other', count: 700, shortLabel: 'OTHER' },
];

export const receiptScraps: TransactionScrap[] = [
  { label: 'MILK', count: 162, rotation: -3 },
  { label: 'AUTO', count: 142, rotation: 2 },
  { label: 'SNACKS', count: 115, rotation: -1.5 },
  { label: 'GROCERIES', count: 113, rotation: 1.8 },
  { label: 'KIRANA', count: 83, rotation: -2.2 },
  { label: 'MOBILE SERVICE', count: 66, rotation: 0.8 },
  { label: 'MEDICINE', count: 61, rotation: -1 },
  { label: 'TRAIN', count: 55, rotation: 2.5 },
  { label: 'DINNER', count: 55, rotation: -0.8 },
  { label: 'TEA', count: 43, rotation: 1.2 },
];

export interface ScaleItem {
  label: string;
  value: string;
  category: 'small' | 'medium' | 'large';
  description: string;
}

export const scaleItems: ScaleItem[] = [
  { label: 'Tea', value: '₹15', category: 'small', description: 'A cup of tea' },
  { label: 'Milk', value: '₹45', category: 'small', description: 'Daily purchase' },
  { label: 'Snacks', value: '₹80', category: 'small', description: 'Small indulgence' },
  { label: 'Auto', value: '₹120', category: 'small', description: 'Local commute' },
  { label: 'Groceries', value: '₹850', category: 'medium', description: 'Weekly stock' },
  { label: 'Mobile Service', value: '₹299', category: 'medium', description: 'Monthly recharge' },
  { label: 'Train', value: '₹650', category: 'medium', description: 'Intercity travel' },
  { label: 'Dinner', value: '₹1,200', category: 'medium', description: 'A meal out' },
  { label: 'Subscription', value: '₹999', category: 'medium', description: 'Annual service' },
  { label: 'Salary', value: '₹45,000', category: 'large', description: 'Monthly income' },
  { label: 'Recurring Deposit', value: '₹10,000', category: 'large', description: 'Monthly savings' },
  { label: 'Mutual Funds', value: '₹25,000', category: 'large', description: 'Investment' },
  { label: 'Public Provident Fund', value: '₹1,50,000', category: 'large', description: 'Annual contribution' },
  { label: 'Money Transfer', value: '₹50,000', category: 'large', description: 'Larger movement' },
];
