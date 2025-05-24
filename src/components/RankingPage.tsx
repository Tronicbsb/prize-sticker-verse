
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Users, Crown, Medal, Award } from 'lucide-react';

interface RankingPageProps {
  playerData: {
    team: 'blue' | 'red';
    ranking: number;
    generalRanking: number;
    totalPower: number;
  };
}

export const RankingPage = ({ playerData }: RankingPageProps) => {
  // Generate realistic team ranking based on player's actual power
  const generateTeamRanking = () => {
    const baseRanking = [
      { rank: 1, name: 'DragonMaster', power: 850, team: playerData.team },
      { rank: 2, name: 'LegendHunter', power: 720, team: playerData.team },
      { rank: 3, name: 'MysticWarrior', power: 680, team: playerData.team },
      { rank: 4, name: 'ShadowBlade', power: 620, team: playerData.team },
      { rank: 5, name: 'FireMage', power: 580, team: playerData.team },
      { rank: 6, name: 'IceQueen', power: 540, team: playerData.team },
      { rank: 7, name: 'StormLord', power: 500, team: playerData.team },
      { rank: 8, name: 'Você', power: playerData.totalPower, team: playerData.team, isPlayer: true },
      { rank: 9, name: 'DarkKnight', power: 420, team: playerData.team },
      { rank: 10, name: 'LightBringer', power: 380, team: playerData.team },
    ];

    // Sort by power and reassign ranks
    const sorted = baseRanking.sort((a, b) => b.power - a.power);
    return sorted.map((player, index) => ({ ...player, rank: index + 1 }));
  };

  const generateGeneralRanking = () => {
    const baseRanking = [
      { rank: 1, name: 'UltimateCollector', power: 950, team: 'red' as const },
      { rank: 2, name: 'CardMaster', power: 900, team: 'blue' as const },
      { rank: 3, name: 'LegendSeeker', power: 875, team: 'red' as const },
      { rank: 4, name: 'MythicHunter', power: 850, team: 'blue' as const },
      { rank: 5, name: 'EpicCollector', power: 820, team: 'red' as const },
      { rank: 6, name: 'RareHunter', power: 780, team: 'blue' as const },
      { rank: 7, name: 'PowerSeeker', power: 750, team: 'red' as const },
      { rank: 8, name: 'GoldCollector', power: 720, team: 'blue' as const },
      { rank: 9, name: 'SilverMaster', power: 680, team: 'red' as const },
      { rank: 10, name: 'BronzeKing', power: 650, team: 'blue' as const },
      { rank: 11, name: 'StickerLord', power: 620, team: 'red' as const },
      { rank: 12, name: 'CardWizard', power: 580, team: 'blue' as const },
      { rank: 13, name: 'AlbumMaster', power: 540, team: 'red' as const },
      { rank: 14, name: 'CollectionPro', power: 500, team: 'blue' as const },
      { rank: 15, name: 'Você', power: playerData.totalPower, team: playerData.team, isPlayer: true },
      { rank: 16, name: 'TradingExpert', power: 420, team: 'red' as const },
      { rank: 17, name: 'PackOpener', power: 380, team: 'blue' as const },
    ];

    // Sort by power and reassign ranks
    const sorted = baseRanking.sort((a, b) => b.power - a.power);
    return sorted.map((player, index) => ({ ...player, rank: index + 1 }));
  };

  const teamRanking = generateTeamRanking();
  const generalRanking = generateGeneralRanking();

  // Find player's actual position
  const playerTeamRank = teamRanking.find(p => p.isPlayer)?.rank || playerData.ranking;
  const playerGeneralRank = generalRanking.find(p => p.isPlayer)?.rank || playerData.generalRanking;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <Trophy className="inline-block w-12 h-12 mr-4" />
            Rankings
          </h1>
          <p className="text-xl text-purple-100 mb-6">
            Veja sua posição nos rankings
          </p>
        </div>

        {/* Player Stats - Updated with actual calculated values */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Suas Estatísticas</h2>
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
                <h3 className="text-2xl font-bold text-yellow-400">#{playerTeamRank}</h3>
                <p className="text-purple-100">Ranking do Time</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400">#{playerGeneralRank}</h3>
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

        {/* Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Ranking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Badge className={`mr-2 ${playerData.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                  {playerData.team === 'blue' ? 'Time Azul' : 'Time Vermelho'}
                </Badge>
                Ranking do Time
              </h2>
              <div className="space-y-3">
                {teamRanking.slice(0, 10).map((player) => (
                  <div
                    key={`team-${player.rank}`}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.isPlayer ? 'bg-purple-600/30 border border-purple-400' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getRankIcon(player.rank)}
                      <div>
                        <h4 className="font-bold">{player.name}</h4>
                        <p className="text-sm text-purple-200">Poder: {player.power.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">#{player.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* General Ranking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Ranking Geral</h2>
              <div className="space-y-3">
                {generalRanking.slice(0, 10).map((player) => (
                  <div
                    key={`general-${player.rank}`}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.isPlayer ? 'bg-purple-600/30 border border-purple-400' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getRankIcon(player.rank)}
                      <div>
                        <h4 className="font-bold">{player.name}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-purple-200">Poder: {player.power.toLocaleString()}</p>
                          <Badge className={`text-xs ${player.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                            {player.team === 'blue' ? 'Azul' : 'Vermelho'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">#{player.rank}</p>
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
