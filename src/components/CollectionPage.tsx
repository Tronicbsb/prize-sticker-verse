
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Users, TrendingUp } from 'lucide-react';
import { StickerCard } from '@/components/StickerCard';
import { Sticker } from '@/types';

interface CollectionPageProps {
  onNavigate: (page: string) => void;
  playerData: {
    team: 'blue' | 'red';
    ranking: number;
    generalRanking: number;
    totalPower: number;
  };
}

export const CollectionPage = ({ onNavigate, playerData }: CollectionPageProps) => {
  // Mock stickers collection with the uploaded images
  const playerStickers: Sticker[] = [
    {
      id: '1',
      name: 'CAVALEIRO DOURADO',
      image: '/lovable-uploads/e45ba7db-0017-43b4-b3a3-6295d9b5afff.png',
      rarity: 'epic',
      power: 50,
      theme: 'Guerreiros',
      team: playerData.team, // Same team as player
      description: 'Um valoroso cavaleiro com armadura dourada'
    },
    {
      id: '2',
      name: 'ANCESTRAL DRAGON',
      image: '/lovable-uploads/3b0c09a4-91c2-442e-86b5-98c21b578549.png',
      rarity: 'mythic',
      power: 200,
      theme: 'Dragões',
      team: playerData.team === 'blue' ? 'red' : 'blue', // Opposite team
      description: 'Um dragão ancestral de imenso poder'
    },
    {
      id: '3',
      name: 'MAGO DAS SOMBRAS',
      image: '/lovable-uploads/baaec923-37bb-45ba-a83f-ffe612b643de.png',
      rarity: 'rare',
      power: 10,
      theme: 'Magia',
      team: playerData.team, // Same team as player
      description: 'Mestre das artes sombrias'
    },
    {
      id: '4',
      name: 'GUERREIRO SAGRADO',
      image: '/lovable-uploads/b2c2b5d4-f5e3-4a8c-8d7f-9e1a2b3c4d5e.png',
      rarity: 'epic',
      power: 75,
      theme: 'Guerreiros',
      team: playerData.team === 'blue' ? 'red' : 'blue', // Opposite team
      description: 'Um guerreiro abençoado pelos deuses'
    },
    {
      id: '5',
      name: 'BRUXA ANCESTRAL',
      image: '/lovable-uploads/c3d3e6f7-a6b4-5b9d-9e8f-0f1e2d3c4b5a.png',
      rarity: 'rare',
      power: 15,
      theme: 'Magia',
      team: playerData.team, // Same team as player
      description: 'Mestra das artes arcanas antigas'
    },
    {
      id: '6',
      name: 'SENHOR DAS TREVAS',
      image: '/lovable-uploads/d4e4f7g8-b7c5-6c0e-0f9g-1g2f3e4d5c6b.png',
      rarity: 'mythic',
      power: 250,
      theme: 'Trevas',
      team: playerData.team, // Same team as player
      description: 'O mais poderoso dos senhores sombrios'
    }
  ];

  // Calculate actual total power based on player's stickers
  const calculateTotalPower = () => {
    return playerStickers.reduce((total, sticker) => {
      const isOppositeTeam = sticker.team !== playerData.team;
      const effectivePower = isOppositeTeam ? Math.floor(sticker.power / 2) : sticker.power;
      return total + effectivePower;
    }, 0);
  };

  const actualTotalPower = calculateTotalPower();

  // Update rankings based on actual power
  const updatedPlayerData = {
    ...playerData,
    totalPower: actualTotalPower,
    ranking: actualTotalPower >= 300 ? 8 : 12, // Better ranking with higher power
    generalRanking: actualTotalPower >= 300 ? 25 : 42 // Better general ranking with higher power
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <Trophy className="inline-block w-12 h-12 mr-4" />
            Minha Coleção
          </h1>
          <p className="text-xl text-purple-100 mb-6">
            Gerencie suas figurinhas e veja seu progresso
          </p>
        </div>

        {/* Player Stats - Updated with calculated power */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Estatísticas do Jogador</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge className={`mb-2 ${updatedPlayerData.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                  {updatedPlayerData.team === 'blue' ? 'Time Azul' : 'Time Vermelho'}
                </Badge>
                <h3 className="text-xl font-bold">Seu Time</h3>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">#{updatedPlayerData.ranking}</h3>
                <p className="text-purple-100">Ranking do Time</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400">#{updatedPlayerData.generalRanking}</h3>
                <p className="text-purple-100">Ranking Geral</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-400">{actualTotalPower.toLocaleString()}</h3>
                <p className="text-purple-100">Poder Total</p>
              </div>
            </div>
            
            {/* Power breakdown */}
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Detalhamento do Poder</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-purple-100">Cartas do seu time: {playerStickers.filter(s => s.team === playerData.team).length}</p>
                  <p className="text-green-400">Poder das cartas do seu time: {playerStickers.filter(s => s.team === playerData.team).reduce((sum, s) => sum + s.power, 0)}</p>
                </div>
                <div>
                  <p className="text-purple-100">Cartas do time oposto: {playerStickers.filter(s => s.team !== playerData.team).length}</p>
                  <p className="text-red-400">Poder reduzido (metade): {playerStickers.filter(s => s.team !== playerData.team).reduce((sum, s) => sum + Math.floor(s.power / 2), 0)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Collection Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('store')}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprar Mais</h3>
              <p className="text-purple-100">Adquira novos pacotes</p>
            </div>
          </Card>

          <Card 
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('marketplace')}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mercadinho</h3>
              <p className="text-purple-100">Troque suas cartas</p>
            </div>
          </Card>

          <Card 
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('ranking')}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ver Rankings</h3>
              <p className="text-purple-100">Compare sua posição</p>
            </div>
          </Card>
        </div>

        {/* Collection Grid */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Suas Figurinhas ({playerStickers.length} cartas)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {playerStickers.map((sticker) => (
                <StickerCard 
                  key={sticker.id} 
                  sticker={sticker}
                  playerTeam={playerData.team}
                  className="w-full max-w-sm mx-auto"
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
