
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Users, TrendingUp } from 'lucide-react';

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

        {/* Player Stats */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Estatísticas do Jogador</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge className={`mb-2 ${playerData.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                  {playerData.team === 'blue' ? 'Time Azul' : 'Time Vermelho'}
                </Badge>
                <h3 className="text-xl font-bold">Seu Time</h3>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">#{playerData.ranking}</h3>
                <p className="text-purple-100">Ranking do Time</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400">#{playerData.generalRanking}</h3>
                <p className="text-purple-100">Ranking Geral</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-400">{playerData.totalPower.toLocaleString()}</h3>
                <p className="text-purple-100">Poder Total</p>
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

        {/* Collection Grid Placeholder */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Suas Figurinhas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 min-h-[300px]">
              <div className="bg-white/5 rounded-lg p-4 flex items-center justify-center">
                <p className="text-purple-100 text-center">Suas figurinhas aparecerão aqui</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
