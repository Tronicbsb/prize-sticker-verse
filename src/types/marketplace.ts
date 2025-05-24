
export interface MarketplaceListing {
  id: string;
  stickerId: string;
  stickerName: string;
  stickerRarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'mythic';
  stickerPower: number;
  stickerTeam: 'blue' | 'red';
  sellerId: string;
  sellerName: string;
  currentPrice: number;
  startingPrice: number;
  isAuction: boolean;
  timeLeft: number; // em horas
  bidCount: number;
  createdAt: Date;
}

export interface MarketplaceFilters {
  searchTerm: string;
  rarity: string;
  team: string;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'price' | 'rarity' | 'timeLeft' | 'power';
  sortOrder: 'asc' | 'desc';
  listingType: 'all' | 'auction' | 'fixed';
}
