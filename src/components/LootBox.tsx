
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LootBoxProps {
  price: number;
  onPurchase: () => void;
  className?: string;
}

export const LootBox = ({ price, onPurchase, className }: LootBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white transition-all duration-300 border border-gray-300 shadow-sm",
        isHovered && "scale-105 shadow-2xl",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 text-center relative z-10">
        {/* Sparkle effects */}
        <div className="absolute inset-0 opacity-20">
          <Sparkles className="absolute top-4 left-4 w-6 h-6 text-yellow-300 animate-pulse" />
          <Sparkles className="absolute top-8 right-6 w-4 h-4 text-yellow-300 animate-pulse delay-300" />
          <Sparkles className="absolute bottom-6 left-8 w-5 h-5 text-yellow-300 animate-pulse delay-700" />
        </div>
        
        {/* Gift icon */}
        <div className="mb-4 flex justify-center">
          <Gift className={cn(
            "w-16 h-16 text-yellow-300 transition-transform duration-300",
            isHovered && "rotate-12 scale-110"
          )} />
        </div>
        
        <h3 className="text-xl font-bold mb-2">Pacote Mistério</h3>
        <p className="text-gray-100 mb-4">Descubra uma figurinha única!</p>
        
        <div className="text-3xl font-bold mb-4 text-yellow-300">
          R$ {price.toFixed(2)}
        </div>
        
        <Button 
          onClick={onPurchase}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Comprar Agora
        </Button>
      </div>
      
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full animate-shine" />
    </Card>
  );
};
