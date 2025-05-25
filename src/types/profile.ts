
export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  pixKey: string;
  balance: number;
  joinDate: Date;
  totalCards: number;
  totalPower: number;
  team: 'blue' | 'red';
}

export interface PlayerStats {
  cardsFromStore: number;
  cardsSoldMarketplace: number;
  cardsBoughtMarketplace: number;
  totalSpentStore: number;
  totalSpentMarketplace: number;
  totalEarnedMarketplace: number;
  totalDeposited: number;
}

export interface FinancialActivity {
  id: string;
  type: 'store_purchase' | 'marketplace_sale' | 'marketplace_purchase' | 'deposit' | 'withdrawal';
  amount: number;
  description: string;
  date: Date;
  cardName?: string;
}
