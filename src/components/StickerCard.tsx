
import { Sticker } from '@/types';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Star } from 'lucide-react';

interface StickerCardProps {
  sticker: Sticker;
  onClick?: () => void;
  className?: string;
  showPower?: boolean;
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

export const StickerCard = ({ sticker, onClick, className, showPower = true }: StickerCardProps) => {
  const rarityClass = rarityGradients[sticker.rarity];
  const textColor = rarityColors[sticker.rarity];
  
  return (
    <Card 
      className={cn(
        "sticker-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
        rarityClass,
        sticker.rarity === 'mythic' && 'animate-glow',
        className
      )}
      onClick={onClick}
    >
      <div className="relative p-4 text-center">
        {/* Team indicator */}
        <div className={cn(
          "absolute top-2 right-2 w-3 h-3 rounded-full",
          sticker.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'
        )} />
        
        {/* Sticker image placeholder */}
        <div className="w-full h-32 bg-white/20 rounded-lg mb-3 flex items-center justify-center">
          <Star className={cn("w-12 h-12", textColor)} />
        </div>
        
        {/* Sticker name */}
        <h3 className="font-bold text-sm mb-2 text-gray-800">{sticker.name}</h3>
        
        {/* Rarity badge */}
        <Badge variant="secondary" className={cn("mb-2 capitalize", textColor)}>
          {sticker.rarity}
        </Badge>
        
        {/* Power display */}
        {showPower && (
          <div className="flex items-center justify-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-gray-800">{sticker.power}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
