
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

// Updated map with new sticker images
const stickerImages = {
  'Guerreiro Sombrio': '/lovable-uploads/7960c9f3-df77-4784-8551-54bc6b7453af.png',
  'Mago Elemental': '/lovable-uploads/7ee319b2-3c62-41e4-becc-b995af9e85ad.png',
  'Dragão Ancestral': '/lovable-uploads/3b0c09a4-91c2-442e-86b5-98c21b578549.png',
  'Arqueiro Élfico': '/lovable-uploads/517a592b-8888-47cf-84f5-4111f01f9406.png',
  'Cavaleiro Dourado': '/lovable-uploads/e45ba7db-0017-43b4-b3a3-6295d9b5afff.png',
  'Feitiço Cósmico': '/lovable-uploads/6617ab67-03a0-429a-a6d8-934880f9aebe.png',
  'Sábio Ancião': '/lovable-uploads/22694fe3-954d-48b3-aeeb-e1b140241913.png',
  'Paladino Sagrado': '/lovable-uploads/6c9aba0e-bad6-44a0-a17d-308822c041dc.png',
  'Rey Sombrio': '/lovable-uploads/04a789d2-682f-47b9-8c77-94bdf7c5a45f.png'
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
      "marketplace-card transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white border border-gray-200",
      listing.stickerRarity === 'mythic' && 'animate-glow'
    )}>
      <div className="relative p-4">
        {/* Team indicator */}
        <div className={cn(
          "absolute top-2 right-2 w-3 h-3 rounded-full",
          listing.stickerTeam === 'blue' ? 'bg-blue-500' : 'bg-red-500'
        )} />
        
        {/* Auction/Fixed indicator */}
        <div className="absolute top-2 left-2">
          {listing.isAuction ? (
            <Badge className="bg-orange-100 text-orange-800 border border-orange-200 text-xs">
              <Gavel className="w-3 h-3 mr-1" />
              Leilão
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-800 border border-green-200 text-xs">
              <DollarSign className="w-3 h-3 mr-1" />
              Fixo
            </Badge>
          )}
        </div>

        {/* Sticker image */}
        <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mt-6 overflow-hidden p-2">
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
          <h3 className="font-bold text-sm mb-1 text-gray-900">{listing.stickerName}</h3>
          <Badge variant="secondary" className={cn("mb-2 capitalize bg-gray-100", textColor)}>
            {listing.stickerRarity}
          </Badge>
          <div className="flex items-center justify-center gap-1 mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-gray-900">{listing.stickerPower}</span>
          </div>
        </div>

        {/* Seller info */}
        <div className="flex items-center justify-center gap-1 mb-3">
          <User className="w-3 h-3 text-gray-500" />
          <span className="text-xs text-gray-600">{listing.sellerName}</span>
        </div>

        {/* Price info */}
        <div className="text-center mb-3">
          <div className="text-lg font-bold text-gray-900">
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
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
              size="sm"
            >
              <Gavel className="w-4 h-4 mr-1" />
              Dar Lance
            </Button>
          ) : (
            <Button
              onClick={() => onBuyNow?.(listing.id)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
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
