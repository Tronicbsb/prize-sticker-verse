
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
  // Updated stickers collection with the new uploaded images
  const playerStickers: Sticker[] = [
    {
      id: '1',
      name: 'ARQUEIRO ÉLFICO',
      image: '/lovable-uploads/517a592b-8888-47cf-84f5-4111f01f9406.png',
      rarity: 'rare',
      power: 35,
      theme: 'Elfos',
      team: playerData.team, // Same team as player
      description: 'Um hábil arqueiro élfico com precisão mortal'
    },
    {
      id: '2',
      name: 'SÁBIO ANCIÃO',
      image: '/lovable-uploads/22694fe3-954d-48b3-aeeb-e1b140241913.png',
      rarity: 'epic',
      power: 80,
      theme: 'Magia',
      team: playerData.team, // Same team as player
      description: 'Um sábio ancião com conhecimentos milenares'
    },
    {
      id: '3',
      name: 'FEITIÇO CÓSMICO',
      image: '/lovable-uploads/6617ab67-03a0-429a-a6d8-934880f9aebe.png',
      rarity: 'mythic',
      power: 200,
      theme: 'Cosmos',
      team: playerData.team === 'blue' ? 'red' : 'blue', // Opposite team
      description: 'Um poderoso feitiço do cosmos infinito'
    },
    {
      id: '4',
      name: 'PALADINO SAGRADO',
      image: '/lovable-uploads/6c9aba0e-bad6-44a0-a17d-308822c041dc.png',
      rarity: 'epic',
      power: 90,
      theme: 'Luz',
      team: playerData.team, // Same team as player
      description: 'Um paladino abençoado pela luz divina'
    },
    {
      id: '5',
      name: 'GUERREIRO SOMBRIO',
      image: '/lovable-uploads/7960c9f3-df77-4784-8551-54bc6b7453af.png',
      rarity: 'epic',
      power: 75,
      theme: 'Trevas',
      team: playerData.team === 'blue' ? 'red' : 'blue', // Opposite team
      description: 'Um temível guerreiro das sombras'
    },
    {
      id: '6',
      name: 'MAGO ELEMENTAL',
      image: '/lovable-uploads/7ee319b2-3c62-41e4-becc-b995af9e85ad.png',
      rarity: 'rare',
      power: 45,
      theme: 'Elementos',
      team: playerData.team, // Same team as player
      description: 'Mestre dos elementos naturais'
    },
    {
      id: '7',
      name: 'REI SOMBRIO',
      image: '/lovable-uploads/04a789d2-682f-47b9-8c77-94bdf7c5a45f.png',
      rarity: 'mythic',
      power: 250,
      theme: 'Realeza Sombria',
      team: playerData.team === 'blue' ? 'red' : 'blue', // Opposite team
      description: 'O poderoso rei das trevas'
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
    ranking: actualTotalPower >= 400 ? 6 : 10, // Better ranking with higher power
    generalRanking: actualTotalPower >= 400 ? 18 : 30 // Better general ranking with higher power
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <Trophy className="inline-block w-12 h-12 mr-4" />
            Minha Coleção
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Gerencie suas figurinhas e veja seu progresso
          </p>
        </div>

        {/* Player Stats - Updated with calculated power */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Estatísticas do Jogador</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge className={`mb-2 ${updatedPlayerData.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                  {updatedPlayerData.team === 'blue' ? 'Time Azul' : 'Time Vermelho'}
                </Badge>
                <h3 className="text-xl font-bold text-gray-900">Seu Time</h3>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">#{updatedPlayerData.ranking}</h3>
                <p className="text-gray-600">Ranking do Time</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400">#{updatedPlayerData.generalRanking}</h3>
                <p className="text-gray-600">Ranking Geral</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-400">{actualTotalPower.toLocaleString()}</h3>
                <p className="text-gray-600">Poder Total</p>
              </div>
            </div>
            
            {/* Power breakdown */}
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-gray-900">Detalhamento do Poder</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Cartas do seu time: {playerStickers.filter(s => s.team === playerData.team).length}</p>
                  <p className="text-green-600">Poder das cartas do seu time: {playerStickers.filter(s => s.team === playerData.team).reduce((sum, s) => sum + s.power, 0)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Cartas do time oposto: {playerStickers.filter(s => s.team !== playerData.team).length}</p>
                  <p className="text-red-600">Poder reduzido (metade): {playerStickers.filter(s => s.team !== playerData.team).reduce((sum, s) => sum + Math.floor(s.power / 2), 0)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Collection Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('store')}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Comprar Mais</h3>
              <p className="text-gray-600">Adquira novos pacotes</p>
            </div>
          </Card>

          <Card 
            className="bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('marketplace')}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Mercadinho</h3>
              <p className="text-gray-600">Troque suas cartas</p>
            </div>
          </Card>

          <Card 
            className="bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('ranking')}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Ver Rankings</h3>
              <p className="text-gray-600">Compare sua posição</p>
            </div>
          </Card>
        </div>

        {/* Collection Grid */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Suas Figurinhas ({playerStickers.length} cartas)</h2>
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
