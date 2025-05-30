
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
  playerTeam?: 'blue' | 'red';
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

export const StickerCard = ({ sticker, onClick, className, showPower = true, playerTeam }: StickerCardProps) => {
  const rarityClass = rarityGradients[sticker.rarity];
  const textColor = rarityColors[sticker.rarity];
  
  // Calculate if card is from opposite team and reduce power
  const isOppositeTeam = playerTeam && sticker.team !== playerTeam;
  const effectivePower = isOppositeTeam ? Math.floor(sticker.power / 2) : sticker.power;
  
  return (
    <Card 
      className={cn(
        "sticker-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/90",
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
        
        {/* Sticker image - Melhorado para melhor visualização */}
        <div className="w-full h-56 mb-3 flex items-center justify-center overflow-hidden rounded-lg bg-white/20 p-2">
          <img 
            src={sticker.image} 
            alt={sticker.name}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        
        {/* Sticker name */}
        <h3 className="font-bold text-sm mb-2 text-gray-800">{sticker.name}</h3>
        
        {/* Rarity badge */}
        <Badge variant="secondary" className={cn("mb-2 capitalize", textColor)}>
          {sticker.rarity}
        </Badge>
        
        {/* Power display with reduction logic */}
        {showPower && (
          <div className="flex items-center justify-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            {isOppositeTeam ? (
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-500 line-through">{sticker.power}</span>
                <span className="font-semibold text-red-600">{effectivePower}</span>
              </div>
            ) : (
              <span className="font-semibold text-gray-800">{sticker.power}</span>
            )}
          </div>
        )}
        
        {/* Opposite team indicator */}
        {isOppositeTeam && (
          <p className="text-xs text-red-600 mt-1">Poder reduzido (time oposto)</p>
        )}
      </div>
    </Card>
  );
};
