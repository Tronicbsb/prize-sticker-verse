
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'mythic';

export interface Sticker {
  id: string;
  name: string;
  image: string;
  rarity: Rarity;
  power: number;
  theme: string;
  team: 'blue' | 'red';
  description?: string;
}

export interface Player {
  id: string;
  name: string;
  totalPower: number;
  stickers: Sticker[];
  selectedTeam: 'blue' | 'red';
  ranking: number;
}

export interface Season {
  id: string;
  name: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  totalPrizePool: number;
  blueTeamPower: number;
  redTeamPower: number;
}

export interface LootBox {
  id: string;
  price: number;
  rarity: Rarity;
  guaranteed?: boolean;
}

export const RARITY_CONFIG = {
  common: { power: 1, probability: 57.5, color: 'rarity-common' },
  uncommon: { power: 3, probability: 30, color: 'rarity-uncommon' },
  rare: { power: 10, probability: 10, color: 'rarity-rare' },
  epic: { power: 50, probability: 2, color: 'rarity-epic' },
  mythic: { power: 200, probability: 0.5, color: 'rarity-mythic' }
};
