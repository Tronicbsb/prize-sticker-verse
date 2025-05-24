
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, TrendingUp, Users, DollarSign, Gavel, Plus } from 'lucide-react';
import { MarketplaceCard } from './MarketplaceCard';
import { MarketplaceFiltersComponent } from './MarketplaceFilters';
import { MarketplaceListing, MarketplaceFilters } from '@/types/marketplace';

export const MarketplacePage = () => {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    searchTerm: '',
    rarity: 'all',
    team: 'all',
    priceRange: { min: 0, max: 10000 },
    sortBy: 'price',
    sortOrder: 'asc',
    listingType: 'all'
  });

  // Mock data para o marketplace
  const mockListings: MarketplaceListing[] = [
    {
      id: '1',
      stickerId: 'warrior_001',
      stickerName: 'Guerreiro Sombrio',
      stickerRarity: 'epic',
      stickerPower: 850,
      stickerTeam: 'blue',
      sellerId: 'player_001',
      sellerName: 'DragonSlayer',
      currentPrice: 2500,
      startingPrice: 2000,
      isAuction: true,
      timeLeft: 23.5,
      bidCount: 12,
      createdAt: new Date()
    },
    {
      id: '2',
      stickerId: 'mage_003',
      stickerName: 'Mago Elemental',
      stickerRarity: 'rare',
      stickerPower: 650,
      stickerTeam: 'red',
      sellerId: 'player_002',
      sellerName: 'FireMaster',
      currentPrice: 1200,
      startingPrice: 1200,
      isAuction: false,
      timeLeft: 0,
      bidCount: 0,
      createdAt: new Date()
    },
    {
      id: '3',
      stickerId: 'dragon_001',
      stickerName: 'Dragão Ancestral',
      stickerRarity: 'mythic',
      stickerPower: 1200,
      stickerTeam: 'blue',
      sellerId: 'player_003',
      sellerName: 'LegendHunter',
      currentPrice: 8500,
      startingPrice: 7000,
      isAuction: true,
      timeLeft: 71.2,
      bidCount: 28,
      createdAt: new Date()
    },
    {
      id: '4',
      stickerId: 'archer_002',
      stickerName: 'Arqueiro Élfico',
      stickerRarity: 'uncommon',
      stickerPower: 420,
      stickerTeam: 'red',
      sellerId: 'player_004',
      sellerName: 'ElfKing',
      currentPrice: 800,
      startingPrice: 800,
      isAuction: false,
      timeLeft: 0,
      bidCount: 0,
      createdAt: new Date()
    },
    {
      id: '5',
      stickerId: 'knight_001',
      stickerName: 'Cavaleiro Dourado',
      stickerRarity: 'epic',
      stickerPower: 780,
      stickerTeam: 'blue',
      sellerId: 'player_005',
      sellerName: 'GoldKnight',
      currentPrice: 3200,
      startingPrice: 2800,
      isAuction: true,
      timeLeft: 12.8,
      bidCount: 19,
      createdAt: new Date()
    },
    {
      id: '6',
      stickerId: 'spell_001',
      stickerName: 'Feitiço Cósmico',
      stickerRarity: 'rare',
      stickerPower: 580,
      stickerTeam: 'red',
      sellerId: 'player_006',
      sellerName: 'CosmicWizard',
      currentPrice: 1500,
      startingPrice: 1500,
      isAuction: false,
      timeLeft: 0,
      bidCount: 0,
      createdAt: new Date()
    }
  ];

  // Filtrar e ordenar listings
  const filteredListings = useMemo(() => {
    let filtered = mockListings.filter(listing => {
      const matchesSearch = listing.stickerName.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesRarity = filters.rarity === 'all' || listing.stickerRarity === filters.rarity;
      const matchesTeam = filters.team === 'all' || listing.stickerTeam === filters.team;
      const matchesType = filters.listingType === 'all' || 
        (filters.listingType === 'auction' && listing.isAuction) ||
        (filters.listingType === 'fixed' && !listing.isAuction);
      const matchesPrice = listing.currentPrice >= filters.priceRange.min && 
        listing.currentPrice <= filters.priceRange.max;

      return matchesSearch && matchesRarity && matchesTeam && matchesType && matchesPrice;
    });

    // Ordenar
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'price':
          aValue = a.currentPrice;
          bValue = b.currentPrice;
          break;
        case 'power':
          aValue = a.stickerPower;
          bValue = b.stickerPower;
          break;
        case 'timeLeft':
          aValue = a.timeLeft;
          bValue = b.timeLeft;
          break;
        case 'rarity':
          const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, mythic: 5 };
          aValue = rarityOrder[a.stickerRarity];
          bValue = rarityOrder[b.stickerRarity];
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  }, [filters]);

  const handleBid = (listingId: string) => {
    console.log('Dar lance na carta:', listingId);
    // Aqui seria implementada a lógica de lance
  };

  const handleBuyNow = (listingId: string) => {
    console.log('Comprar carta:', listingId);
    // Aqui seria implementada a lógica de compra
  };

  const marketStats = {
    totalListings: mockListings.length,
    activeAuctions: mockListings.filter(l => l.isAuction).length,
    averagePrice: Math.round(mockListings.reduce((sum, l) => sum + l.currentPrice, 0) / mockListings.length),
    totalVolume: mockListings.reduce((sum, l) => sum + l.currentPrice, 0)
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <Store className="inline-block w-12 h-12 mr-4" />
            Mercadinho
          </h1>
          <p className="text-xl text-purple-100 mb-6">
            Compre e venda cartas com outros jogadores
          </p>
          
          <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <Plus className="w-5 h-5 mr-2" />
            Vender Minha Carta
          </Button>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <h3 className="text-2xl font-bold text-blue-400">{marketStats.totalListings}</h3>
            <p className="text-sm text-purple-100">Cartas à Venda</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 text-center">
            <Gavel className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <h3 className="text-2xl font-bold text-orange-400">{marketStats.activeAuctions}</h3>
            <p className="text-sm text-purple-100">Leilões Ativos</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <h3 className="text-2xl font-bold text-green-400">R$ {marketStats.averagePrice.toLocaleString()}</h3>
            <p className="text-sm text-purple-100">Preço Médio</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <h3 className="text-2xl font-bold text-purple-400">R$ {marketStats.totalVolume.toLocaleString()}</h3>
            <p className="text-sm text-purple-100">Volume Total</p>
          </Card>
        </div>

        {/* Filters */}
        <MarketplaceFiltersComponent 
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">
            {filteredListings.length} carta(s) encontrada(s)
          </h2>
          <div className="flex gap-2">
            <Badge className="bg-blue-500 text-white">
              {filteredListings.filter(l => !l.isAuction).length} Preço Fixo
            </Badge>
            <Badge className="bg-orange-500 text-white">
              {filteredListings.filter(l => l.isAuction).length} Leilões
            </Badge>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <MarketplaceCard
              key={listing.id}
              listing={listing}
              onBid={handleBid}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-12 text-center">
            <Store className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">Nenhuma carta encontrada</h3>
            <p className="text-purple-100 mb-4">
              Tente ajustar os filtros para encontrar mais cartas.
            </p>
            <Button
              onClick={() => setFilters({
                searchTerm: '',
                rarity: 'all',
                team: 'all',
                priceRange: { min: 0, max: 10000 },
                sortBy: 'price',
                sortOrder: 'asc',
                listingType: 'all'
              })}
              variant="outline"
              className="border-purple-400 text-purple-200 hover:bg-purple-700 hover:text-white"
            >
              Limpar Filtros
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};
