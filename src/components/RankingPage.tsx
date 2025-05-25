
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Users, Crown, Medal, Award, DollarSign, Zap } from 'lucide-react';

interface RankingPageProps {
  playerData: {
    team: 'blue' | 'red';
    ranking: number;
    generalRanking: number;
    totalPower: number;
  };
}

export const RankingPage = ({ playerData }: RankingPageProps) => {
  // Calculate player statistics
  const totalCards = 6; // Player has 6 cards in collection
  const totalPossibleCards = 50; // Total cards in the season
  const completionPercentage = Math.round((totalCards / totalPossibleCards) * 100);
  
  // Prize pool calculations
  const totalPrizePool = 75000;
  const teamPrizePool = totalPrizePool * 0.6; // 60% for team prizes
  const generalPrizePool = totalPrizePool * 0.4; // 40% for general prizes
  
  // Calculate prize participation based on ranking
  const calculateTeamPrize = () => {
    if (playerData.ranking <= 3) return teamPrizePool * 0.4; // Top 3 get 40%
    if (playerData.ranking <= 10) return teamPrizePool * 0.35 / 7; // Next 7 share 35%
    if (playerData.ranking <= 20) return teamPrizePool * 0.25 / 10; // Next 10 share 25%
    return 0;
  };

  const calculateGeneralPrize = () => {
    if (playerData.generalRanking <= 5) return generalPrizePool * 0.5; // Top 5 get 50%
    if (playerData.generalRanking <= 15) return generalPrizePool * 0.3 / 10; // Next 10 share 30%
    if (playerData.generalRanking <= 30) return generalPrizePool * 0.2 / 15; // Next 15 share 20%
    return 0;
  };

  const estimatedTeamPrize = calculateTeamPrize();
  const estimatedGeneralPrize = calculateGeneralPrize();
  const totalEstimatedPrize = estimatedTeamPrize + estimatedGeneralPrize;

  // Team stats for comparison
  const blueTeamPower = 12995;
  const redTeamPower = 10040;
  const blueTeamPrize = 37500;
  const redTeamPrize = 24975;
  const nextSeasonBonus = 12525;

  // Generate realistic team ranking based on player's actual power
  const generateTeamRanking = () => {
    const baseRanking = [
      { rank: 1, name: 'CaçadorDragões', power: 3607, prize: 3607.16, percentage: 9.62 },
      { rank: 2, name: 'GuardianAzul', power: 3405, prize: 3405.16, percentage: 9.08 },
      { rank: 3, name: 'MysticWarrior', power: 2890, prize: 2890.50, percentage: 7.71 },
      { rank: 4, name: 'ShadowBlade', power: 2650, prize: 2650.25, percentage: 7.07 },
      { rank: 5, name: 'FireMage', power: 2420, prize: 2420.80, percentage: 6.45 },
      { rank: 6, name: 'IceQueen', power: 2180, prize: 2180.40, percentage: 5.82 },
      { rank: 7, name: 'StormLord', power: 1950, prize: 1950.20, percentage: 5.20 },
      { rank: 8, name: 'Você', power: playerData.totalPower, prize: estimatedTeamPrize, percentage: ((estimatedTeamPrize / blueTeamPrize) * 100), isPlayer: true },
      { rank: 9, name: 'DarkKnight', power: 1680, prize: 1680.30, percentage: 4.48 },
      { rank: 10, name: 'LightBringer', power: 1420, prize: 1420.15, percentage: 3.79 },
    ];

    return baseRanking.sort((a, b) => b.power - a.power).map((player, index) => ({ ...player, rank: index + 1 }));
  };

  const generateRedTeamRanking = () => {
    return [
      { rank: 1, name: 'DemônioVermelho', power: 2935, prize: 2935.31, percentage: 11.75 },
      { rank: 2, name: 'SenhorFogo', power: 2786, prize: 2786.06, percentage: 11.16 },
      { rank: 3, name: 'DragonCrimson', power: 2620, prize: 2620.40, percentage: 10.49 },
      { rank: 4, name: 'BloodMage', power: 2450, prize: 2450.25, percentage: 9.81 },
      { rank: 5, name: 'InfernoLord', power: 2280, prize: 2280.15, percentage: 9.13 },
    ];
  };

  const teamRanking = generateTeamRanking();
  const redTeamRanking = generateRedTeamRanking();

  // Find player's actual position
  const playerTeamRank = teamRanking.find(p => p.isPlayer)?.rank || playerData.ranking;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
            Ranking da Temporada
          </h1>
          <p className="text-gray-600 text-lg">
            Veja os melhores jogadores e a distribuição de prêmios.
          </p>
        </div>

        {/* Player Classification */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">Sua Classificação</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-1">Ranking Geral</h3>
                <p className="text-3xl font-bold text-blue-600">#{playerData.generalRanking}</p>
                <p className="text-xs text-gray-500">de 35 jogadores</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-1">No Seu Time</h3>
                <p className="text-3xl font-bold text-blue-600">#{playerTeamRank}</p>
                <p className="text-xs text-blue-600">de 20 do Time Azul</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-1">Seu Poder</h3>
                <p className="text-3xl font-bold text-green-600">{playerData.totalPower}</p>
                <p className="text-xs text-gray-500">3 figurinhas</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Prize Pool */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-800">Pool de Prêmios</h2>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-green-600">R$ {totalPrizePool.toLocaleString('pt-BR')},00</p>
              <p className="text-sm text-gray-600">Baseado em R$ 150.000,00 de vendas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800">Time Azul</h3>
                <p className="text-2xl font-bold text-blue-600">R$ {blueTeamPrize.toLocaleString('pt-BR')},00</p>
                <p className="text-sm text-green-600 font-medium">Vencedor</p>
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800">Time Vermelho</h3>
                <p className="text-2xl font-bold text-red-600">R$ {redTeamPrize.toLocaleString('pt-BR')},00</p>
                <p className="text-sm text-red-600 font-medium">Perdedor</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800">Próxima Temporada</h3>
                <p className="text-2xl font-bold text-gray-600">R$ {nextSeasonBonus.toLocaleString('pt-BR')},00</p>
                <p className="text-sm text-gray-600">Bônus Acumulado</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Team Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blue Team */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-600">Time Azul</h2>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-blue-600">{blueTeamPower.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">Poder Total</span>
                </div>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-600">Pool do Time: <span className="font-semibold text-green-600">R$ {blueTeamPrize.toLocaleString('pt-BR')},00</span></p>
              </div>

              <div className="space-y-3">
                {teamRanking.slice(0, 5).map((player) => (
                  <div
                    key={`blue-${player.rank}`}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      player.isPlayer 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(player.rank)}
                        <span className="text-sm font-bold text-gray-600">#{player.rank}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{player.name}</h4>
                        <p className="text-xs text-gray-500">{player.power.toLocaleString()} poder • 15 figurinhas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">R$ {player.prize.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      <p className="text-xs text-gray-500">{player.percentage.toFixed(2)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Red Team */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-red-600">Time Vermelho</h2>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span className="font-bold text-red-600">{redTeamPower.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">Poder Total</span>
                </div>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-600">Pool do Time: <span className="font-semibold text-green-600">R$ {redTeamPrize.toLocaleString('pt-BR')},00</span></p>
              </div>

              <div className="space-y-3">
                {redTeamRanking.map((player) => (
                  <div
                    key={`red-${player.rank}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(player.rank)}
                        <span className="text-sm font-bold text-gray-600">#{player.rank}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{player.name}</h4>
                        <p className="text-xs text-gray-500">{player.power.toLocaleString()} poder • 14 figurinhas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">R$ {player.prize.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      <p className="text-xs text-gray-500">{player.percentage.toFixed(2)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
