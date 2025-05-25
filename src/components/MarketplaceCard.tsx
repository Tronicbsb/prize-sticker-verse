
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Star, Clock, Gavel, DollarSign, User } from 'lucide-react';
import { MarketplaceListing } from '@/types/marketplace';
import { cn } from '@/lib/utils';

interface MarketplaceCardProps {
  listing: MarketplaceListing;
  onBid?: (listingId: string) => void;
  onBuyNow?: (listingId: string) => void;
}

const rarityGradients = {
  common: 'bg-gradient-rarity-common',
  uncommon: 'bg-gradient-rarity-uncommon',
  rare: 'bg-gradient-rarity-rare',
  epic: 'bg-gradient-rarity-epic',
  mythic: 'bg-gradient-rarity-mythic'
};

const rarityColors = {
  common: 'text-gray-600',
  uncommon: 'text-green-600',
  rare: 'text-blue-600',
  epic: 'text-purple-600',
  mythic: 'text-amber-600'
};

// Map sticker names to their images
const stickerImages = {
  'Guerreiro Sombrio': '/lovable-uploads/e45ba7db-0017-43b4-b3a3-6295d9b5afff.png',
  'Mago Elemental': '/lovable-uploads/baaec923-37bb-45ba-a83f-ffe612b643de.png',
  'Dragão Ancestral': '/lovable-uploads/3b0c09a4-91c2-442e-86b5-98c21b578549.png',
  'Arqueiro Élfico': '/lovable-uploads/e45ba7db-0017-43b4-b3a3-6295d9b5afff.png',
  'Cavaleiro Dourado': '/lovable-uploads/e45ba7db-0017-43b4-b3a3-6295d9b5afff.png',
  'Feitiço Cósmico': '/lovable-uploads/baaec923-37bb-45ba-a83f-ffe612b643de.png'
};

export const MarketplaceCard = ({ listing, onBid, onBuyNow }: MarketplaceCardProps) => {
  const rarityClass = rarityGradients[listing.stickerRarity];
  const textColor = rarityColors[listing.stickerRarity];
  const stickerImage = stickerImages[listing.stickerName as keyof typeof stickerImages];

  const formatTimeLeft = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours < 24) return `${Math.round(hours)}h`;
    return `${Math.round(hours / 24)}d`;
  };

  return (
    <Card className={cn(
      "marketplace-card transition-all duration-300 hover:scale-105 hover:shadow-lg",
      rarityClass,
      listing.stickerRarity === 'mythic' && 'animate-glow'
    )}>
      <div className="relative p-4">
        {/* Time indicator */}
        <div className={cn(
          "absolute top-2 right-2 w-3 h-3 rounded-full",
          listing.stickerTeam === 'blue' ? 'bg-blue-500' : 'bg-red-500'
        )} />
        
        {/* Auction/Fixed indicator */}
        <div className="absolute top-2 left-2">
          {listing.isAuction ? (
            <Badge className="bg-orange-500 text-white text-xs">
              <Gavel className="w-3 h-3 mr-1" />
              Leilão
            </Badge>
          ) : (
            <Badge className="bg-green-500 text-white text-xs">
              <DollarSign className="w-3 h-3 mr-1" />
              Fixo
            </Badge>
          )}
        </div>

        {/* Sticker image - Aumentado para melhor visualização */}
        <div className="w-full h-40 bg-white/20 rounded-lg mb-3 flex items-center justify-center mt-6 overflow-hidden p-2">
          {stickerImage ? (
            <img 
              src={stickerImage} 
              alt={listing.stickerName}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <Star className={cn("w-12 h-12", textColor)} />
          )}
        </div>
        
        {/* Sticker info */}
        <div className="text-center mb-3">
          <h3 className="font-bold text-sm mb-1 text-gray-800">{listing.stickerName}</h3>
          <Badge variant="secondary" className={cn("mb-2 capitalize", textColor)}>
            {listing.stickerRarity}
          </Badge>
          <div className="flex items-center justify-center gap-1 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-gray-800">{listing.stickerPower}</span>
          </div>
        </div>

        {/* Seller info */}
        <div className="flex items-center justify-center gap-1 mb-3">
          <User className="w-3 h-3 text-gray-600" />
          <span className="text-xs text-gray-600">{listing.sellerName}</span>
        </div>

        {/* Price info */}
        <div className="text-center mb-3">
          <div className="text-lg font-bold text-gray-800">
            R$ {listing.currentPrice.toLocaleString()}
          </div>
          {listing.isAuction && listing.bidCount > 0 && (
            <div className="text-xs text-gray-600">
              {listing.bidCount} lance(s)
            </div>
          )}
        </div>

        {/* Time left for auctions */}
        {listing.isAuction && (
          <div className="flex items-center justify-center gap-1 mb-3">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              {formatTimeLeft(listing.timeLeft)} restante(s)
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-2">
          {listing.isAuction ? (
            <Button
              onClick={() => onBid?.(listing.id)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              size="sm"
            >
              <Gavel className="w-4 h-4 mr-1" />
              Dar Lance
            </Button>
          ) : (
            <Button
              onClick={() => onBuyNow?.(listing.id)}
              className="w-full bg-green-500 hover:green-600 text-white"
              size="sm"
            >
              <DollarSign className="w-4 h-4 mr-1" />
              Comprar Agora
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
