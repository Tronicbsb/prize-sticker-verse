
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Users, 
  Clock, 
  DollarSign,
  TrendingUp,
  Star,
  Zap,
  Info
} from 'lucide-react';
import { ApresentacaoViewer } from './ApresentacaoViewer';

interface HomePageProps {
  onNavigate: (page: string) => void;
  playerData: {
    team: 'blue' | 'red';
    ranking: number;
    generalRanking: number;
    totalPower: number;
  };
}

export const HomePage = ({ onNavigate, playerData }: HomePageProps) => {
  const [mostrarApresentacao, setMostrarApresentacao] = useState(false);

  const currentSeason = {
    name: "Guerreiros Místicos",
    theme: "Fantasia Medieval",
    daysLeft: 23,
    totalPrizePool: 75000,
    blueTeamPower: 125000,
    redTeamPower: 118000,
    playerCount: 1247
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Banner Section */}
        <div className="w-full max-w-4xl mx-auto mb-6">
          <img 
            src="/lovable-uploads/c996ba45-113d-4654-9def-edcb642af8a5.png" 
            alt="Banner Guerreiros Místicos" 
            className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg border-2 border-gray-200"
          />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Álbum de Figurinhas
            <span className="block text-yellow-600">Premiadas</span>
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Colecione, Compete e Ganhe Prêmios Reais!
          </p>
          
          <Button 
            onClick={() => setMostrarApresentacao(true)}
            variant="outline"
            className="mb-4 mr-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Info className="w-4 h-4 mr-2" />
            Saiba Mais sobre o Projeto
          </Button>

          <Button 
            onClick={() => onNavigate('store')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Começar a Colecionar
          </Button>
        </div>

        {/* Season Info */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Temporada Atual</h2>
              <Badge className="bg-green-500 text-white">
                <Clock className="w-4 h-4 mr-1" />
                {currentSeason.daysLeft} dias
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-yellow-600">
                  {currentSeason.name}
                </h3>
                <p className="text-gray-600">{currentSeason.theme}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">
                  R$ {currentSeason.totalPrizePool.toLocaleString()}
                </h3>
                <p className="text-gray-600">Pool de Prêmios</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600">
                  {currentSeason.playerCount.toLocaleString()}
                </h3>
                <p className="text-gray-600">Jogadores Ativos</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-600">
                  #{playerData.ranking} (time) / #{playerData.generalRanking} (geral)
                </h3>
                <p className="text-gray-600">Seu Ranking</p>
                <Badge className={`mt-1 ${playerData.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'} text-white text-xs`}>
                  {playerData.team === 'blue' ? 'Time Azul' : 'Time Vermelho'}
                </Badge>
              </div>
            </div>

            {/* Team Battle */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4 text-center text-gray-900">Batalha dos Times</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-600">Time Azul</h4>
                  <p className="text-2xl font-bold text-gray-900">{currentSeason.blueTeamPower.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Poder Total</p>
                  {playerData.team === 'blue' && (
                    <Badge className="bg-blue-500 text-white text-xs mt-1">Seu Time</Badge>
                  )}
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-red-600">Time Vermelho</h4>
                  <p className="text-2xl font-bold text-gray-900">{currentSeason.redTeamPower.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Poder Total</p>
                  {playerData.team === 'red' && (
                    <Badge className="bg-red-500 text-white text-xs mt-1">Seu Time</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('store')}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Comprar Pacotes</h3>
              <p className="text-gray-600">Descubra novas figurinhas raras</p>
            </div>
          </Card>

          <Card 
            className="bg-white border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('collection')}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Minha Coleção</h3>
              <p className="text-gray-600">Veja suas figurinhas e poder</p>
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
              <p className="text-gray-600">Troque com outros jogadores</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Visualizador de Apresentação Condicional */}
      {mostrarApresentacao && (
        <ApresentacaoViewer 
          totalSlides={31}
          onClose={() => setMostrarApresentacao(false)} 
        />
      )}
    </div>
  );
};
