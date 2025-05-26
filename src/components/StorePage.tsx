
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LootBox } from './LootBox';
import { StickerCard } from './StickerCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sticker, Rarity } from '@/types';
import { Gift, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';

export const StorePage = () => {
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [revealedSticker, setRevealedSticker] = useState<Sticker | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handlePurchase = () => {
    setIsOpeningBox(true);
    
    // Simulate opening animation
    setTimeout(() => {
      const newSticker = generateRandomSticker();
      setRevealedSticker(newSticker);
      setIsOpeningBox(false);
      setShowResult(true);
      toast.success(`Você ganhou uma figurinha ${newSticker.rarity}!`);
    }, 2000);
  };

  const generateRandomSticker = (): Sticker => {
    const rarities: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'mythic'];
    const probabilities = [57.5, 30, 10, 2, 0.5];
    
    const rand = Math.random() * 100;
    let acc = 0;
    let selectedRarity: Rarity = 'common';
    
    for (let i = 0; i < probabilities.length; i++) {
      acc += probabilities[i];
      if (rand <= acc) {
        selectedRarity = rarities[i];
        break;
      }
    }
    
    const powers: Record<Rarity, number> = { 
      common: 1, 
      uncommon: 3, 
      rare: 10, 
      epic: 50, 
      mythic: 200 
    };
    const teams = ['blue', 'red'] as const;
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `Guerreiro ${Math.floor(Math.random() * 1000)}`,
      image: '',
      rarity: selectedRarity,
      power: powers[selectedRarity],
      theme: 'Guerreiros Místicos',
      team: teams[Math.floor(Math.random() * 2)],
      description: 'Um poderoso guerreiro místico'
    };
  };

  const closeResult = () => {
    setShowResult(false);
    setRevealedSticker(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Loja de Pacotes</h1>
          <p className="text-xl text-gray-600">
            Compre pacotes mistério e descubra figurinhas únicas!
          </p>
        </div>

        {/* Loot Box */}
        <div className="max-w-md mx-auto mb-8">
          <LootBox price={3.00} onPurchase={handlePurchase} />
        </div>

        {/* Probability Display */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-8">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Chances de Raridade</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-400 rounded mx-auto mb-2"></div>
                <p className="font-semibold text-gray-900">Comum</p>
                <p className="text-sm text-gray-600">57.5%</p>
                <p className="text-sm text-yellow-600">1 Poder</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-500 rounded mx-auto mb-2"></div>
                <p className="font-semibold text-gray-900">Incomum</p>
                <p className="text-sm text-gray-600">30%</p>
                <p className="text-sm text-yellow-600">3 Poder</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2"></div>
                <p className="font-semibold text-gray-900">Rara</p>
                <p className="text-sm text-gray-600">10%</p>
                <p className="text-sm text-yellow-600">10 Poder</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-500 rounded mx-auto mb-2"></div>
                <p className="font-semibold text-gray-900">Épica</p>
                <p className="text-sm text-gray-600">2%</p>
                <p className="text-sm text-yellow-600">50 Poder</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-amber-500 rounded mx-auto mb-2"></div>
                <p className="font-semibold text-gray-900">Mítica</p>
                <p className="text-sm text-gray-600">0.5%</p>
                <p className="text-sm text-yellow-600">200 Poder</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Opening Animation Dialog */}
        <Dialog open={isOpeningBox} onOpenChange={() => {}}>
          <DialogContent className="bg-white border border-gray-200">
            <div className="text-center py-8">
              <Gift className="w-24 h-24 mx-auto mb-4 text-yellow-500 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Abrindo Pacote...</h3>
              <div className="flex justify-center space-x-2">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse delay-200" />
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse delay-500" />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Result Dialog */}
        <Dialog open={showResult} onOpenChange={closeResult}>
          <DialogContent className="bg-white border border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-yellow-600">
                Parabéns! 🎉
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-4">
              {revealedSticker && (
                <div className="max-w-xs mx-auto">
                  <StickerCard sticker={revealedSticker} />
                  <p className="mt-4 text-lg text-gray-900">
                    Você ganhou uma figurinha <span className="font-bold capitalize">{revealedSticker.rarity}</span>!
                  </p>
                </div>
              )}
              <Button 
                onClick={closeResult}
                className="mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold"
              >
                Continuar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
