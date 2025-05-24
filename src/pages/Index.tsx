
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { StorePage } from '@/components/StorePage';
import { StickerCard } from '@/components/StickerCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sticker } from '@/types';
import { Trophy, Users, Package, DollarSign, Zap, Star } from 'lucide-react';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Mock data for collection
  const mockStickers: Sticker[] = [
    {
      id: '1',
      name: 'Cavaleiro Dourado',
      image: '',
      rarity: 'epic',
      power: 50,
      theme: 'Guerreiros Místicos',
      team: 'blue'
    },
    {
      id: '2',
      name: 'Mago das Sombras',
      image: '',
      rarity: 'rare',
      power: 10,
      theme: 'Guerreiros Místicos',
      team: 'red'
    },
    {
      id: '3',
      name: 'Dragão Ancestral',
      image: '',
      rarity: 'mythic',
      power: 200,
      theme: 'Guerreiros Místicos',
      team: 'blue'
    }
  ];

  // Mock blue team players - placing player with proper ranking
  const mockBlueTeamPlayers = [
    { name: 'CaçadorDragões', power: 1250, stickers: 15, isPlayer: false },
    { name: 'GuardianAzul', power: 1180, stickers: 12, isPlayer: false },
    { name: 'MestreCards', power: 1050, stickers: 18, isPlayer: false },
    { name: 'LendaAzul', power: 980, stickers: 8, isPlayer: false },
    { name: 'VikingAzul', power: 920, stickers: 14, isPlayer: false },
    { name: 'ArqueiroMístico', power: 880, stickers: 11, isPlayer: false },
    { name: 'PaladinoReal', power: 850, stickers: 13, isPlayer: false },
    { name: 'MagoElemental', power: 820, stickers: 9, isPlayer: false },
    { name: 'CavaleiroBravo', power: 790, stickers: 16, isPlayer: false },
    { name: 'ArqueiroAzul', power: 750, stickers: 10, isPlayer: false },
    { name: 'GuerreiroPrata', power: 720, stickers: 12, isPlayer: false },
    { name: 'CaçadorRaro', power: 680, stickers: 9, isPlayer: false },
    { name: 'MagoBrilhante', power: 650, stickers: 11, isPlayer: false },
    { name: 'EscudeiroReal', power: 620, stickers: 8, isPlayer: false },
    { name: 'Você', power: 260, stickers: 3, isPlayer: true }, // Player at 15th position
    { name: 'NovatoAzul', power: 180, stickers: 5, isPlayer: false },
    { name: 'ColetorIniciante', power: 150, stickers: 4, isPlayer: false },
    { name: 'AprendizAzul', power: 120, stickers: 3, isPlayer: false },
    { name: 'CaçadorNovato', power: 90, stickers: 2, isPlayer: false },
    { name: 'InicianteAzul', power: 60, stickers: 3, isPlayer: false }
  ].sort((a, b) => b.power - a.power);

  const mockRedTeamPlayers = [
    { name: 'DemônioVermelho', power: 1180, stickers: 14, isPlayer: false },
    { name: 'SenhorFogo', power: 1120, stickers: 16, isPlayer: false },
    { name: 'GuerreiroSombrio', power: 1080, stickers: 11, isPlayer: false },
    { name: 'MestreVermelho', power: 1020, stickers: 13, isPlayer: false },
    { name: 'BerserkerRubi', power: 950, stickers: 9, isPlayer: false },
    { name: 'LâminaEscarlate', power: 890, stickers: 15, isPlayer: false },
    { name: 'TitãVermelho', power: 860, stickers: 12, isPlayer: false },
    { name: 'FenixCarmesim', power: 830, stickers: 10, isPlayer: false },
    { name: 'DragonVermelho', power: 800, stickers: 17, isPlayer: false },
    { name: 'LordeSombrio', power: 770, stickers: 8, isPlayer: false },
    { name: 'NovatoVermelho', power: 160, stickers: 4, isPlayer: false },
    { name: 'InicianteRubi', power: 140, stickers: 5, isPlayer: false },
    { name: 'AprendizVermelho', power: 110, stickers: 3, isPlayer: false },
    { name: 'CaçadorIniciante', power: 80, stickers: 2, isPlayer: false },
    { name: 'NovoVermelho', power: 50, stickers: 2, isPlayer: false }
  ].sort((a, b) => b.power - a.power);

  // Mock season data with prize pool calculations
  const mockSeasonData = {
    totalSales: 150000, // R$ 150,000 in sales (50,000 loot boxes sold)
    totalPrizePool: 75000, // 50% of sales goes to prize pool
    blueTeamPower: mockBlueTeamPlayers.reduce((sum, player) => sum + player.power, 0),
    redTeamPower: mockRedTeamPlayers.reduce((sum, player) => sum + player.power, 0),
    daysLeft: 23
  };

  // Find player in the blue team and get ranking
  const playerTeamRanking = mockBlueTeamPlayers.findIndex(p => p.isPlayer) + 1;
  
  // Get player's data
  const playerData = {
    team: 'blue' as const, // Player is in blue team
    ranking: playerTeamRanking, // Consistent ranking across all pages
    stickers: mockStickers.length,
    totalPower: mockStickers.reduce((sum, sticker) => sum + sticker.power, 0)
  };

  // Calculate all players for general ranking
  const allPlayers = [...mockBlueTeamPlayers, ...mockRedTeamPlayers].sort((a, b) => b.power - a.power);
  const playerGeneralRanking = allPlayers.findIndex(p => p.isPlayer) + 1;

  // Calculate prize distribution
  const totalPower = mockSeasonData.blueTeamPower + mockSeasonData.redTeamPower;
  const blueTeamPercentage = mockSeasonData.blueTeamPower / totalPower;
  const redTeamPercentage = mockSeasonData.redTeamPower / totalPower;
  
  // Prize pool distribution (based on the document)
  const winningTeamIsBlue = mockSeasonData.blueTeamPower > mockSeasonData.redTeamPower;
  const winningTeamPrize = mockSeasonData.totalPrizePool * 0.5; // 25% of total sales = 50% of prize pool
  const losingTeamPrize = mockSeasonData.totalPrizePool * 0.333; // 16.67% of total sales = 33.3% of prize pool
  const nextSeasonBonus = mockSeasonData.totalPrizePool * 0.167; // 8.33% of total sales = 16.7% of prize pool

  const blueTeamPrize = winningTeamIsBlue ? winningTeamPrize : losingTeamPrize;
  const redTeamPrize = winningTeamIsBlue ? losingTeamPrize : winningTeamPrize;

  const renderCollectionPage = () => (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Minha Coleção</h1>
          <p className="text-xl text-purple-100 mb-6">
            Suas figurinhas e estatísticas
          </p>
          {/* Player Team Info */}
          <div className="flex justify-center mb-4">
            <Badge className={`${playerData.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'} text-white px-4 py-2`}>
              {playerData.team === 'blue' ? '🔵 Time Azul' : '🔴 Time Vermelho'}
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold text-blue-400">{playerData.stickers}</h3>
              <p className="text-purple-100">Figurinhas</p>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold text-yellow-400">
                {playerData.totalPower}
              </h3>
              <p className="text-purple-100">Poder Total</p>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-bold text-green-400">#{playerTeamRanking} (time) / #{playerGeneralRanking} (geral)</h3>
              <p className="text-purple-100">Ranking</p>
            </div>
          </Card>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockStickers.map((sticker) => (
            <StickerCard key={sticker.id} sticker={sticker} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderRankingPage = () => (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Ranking da Temporada</h1>
          <p className="text-xl text-purple-100">
            Veja os melhores jogadores de cada time
          </p>
        </div>

        {/* Player Info Card */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-purple-300/30 text-white mb-6">
          <div className="p-6">
            <div className="text-center mb-4">
              <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
              <h3 className="text-2xl font-bold text-yellow-300">Sua Classificação</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <h4 className="font-bold text-purple-300">Ranking Geral</h4>
                <p className="text-2xl font-bold text-yellow-300">#{playerGeneralRanking}</p>
                <p className="text-sm text-purple-100">de {allPlayers.length} jogadores</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <h4 className="font-bold text-blue-300">No Seu Time</h4>
                <p className="text-2xl font-bold text-blue-300">#{playerTeamRanking}</p>
                <p className="text-sm text-purple-100">de {mockBlueTeamPlayers.length} do time {playerData.team === 'blue' ? '(Time Azul)' : '(Time Vermelho)'}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <h4 className="font-bold text-green-300">Seu Poder</h4>
                <p className="text-2xl font-bold text-green-300">{playerData.totalPower}</p>
                <p className="text-sm text-purple-100">{mockStickers.length} figurinhas</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Prize Pool Info */}
        <Card className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm border-yellow-300/30 text-white mb-6">
          <div className="p-6">
            <div className="text-center mb-4">
              <DollarSign className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
              <h3 className="text-2xl font-bold text-yellow-300">Pool de Prêmios da Temporada</h3>
              <p className="text-3xl font-bold text-white">R$ {mockSeasonData.totalPrizePool.toLocaleString()}</p>
              <p className="text-sm text-yellow-100">Baseado em R$ {mockSeasonData.totalSales.toLocaleString()} de vendas</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <h4 className="font-bold text-blue-300">Time Azul</h4>
                <p className="text-xl font-bold">R$ {blueTeamPrize.toLocaleString()}</p>
                <p className="text-sm text-purple-100">{winningTeamIsBlue ? 'Vencedor' : 'Perdedor'}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <h4 className="font-bold text-red-300">Time Vermelho</h4>
                <p className="text-xl font-bold">R$ {redTeamPrize.toLocaleString()}</p>
                <p className="text-sm text-purple-100">{!winningTeamIsBlue ? 'Vencedor' : 'Perdedor'}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <h4 className="font-bold text-green-300">Próxima Temporada</h4>
                <p className="text-xl font-bold">R$ {nextSeasonBonus.toLocaleString()}</p>
                <p className="text-sm text-purple-100">Bônus Acumulado</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blue Team Ranking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-400">Time Azul</h3>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold">{mockSeasonData.blueTeamPower.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-purple-100">Poder Total</p>
                </div>
              </div>
              <div className="mb-4 bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pool do Time:</span>
                  <span className="font-bold text-blue-300">R$ {blueTeamPrize.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {mockBlueTeamPlayers.slice(0, 10).map((player, index) => {
                  const playerPercentage = player.power / mockSeasonData.blueTeamPower;
                  const playerPrize = blueTeamPrize * playerPercentage;
                  
                  return (
                    <div key={index} className={`flex items-center justify-between rounded-lg p-3 ${player.isPlayer ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-white/5'}`}>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`${player.isPlayer ? 'text-yellow-300 border-yellow-300' : 'text-yellow-400 border-yellow-400'}`}>
                          #{index + 1}
                        </Badge>
                        <div>
                          <span className={`block ${player.isPlayer ? 'font-bold text-yellow-300' : ''}`}>
                            {player.name}
                            {player.isPlayer && ' (Você)'}
                          </span>
                          <span className="text-sm text-purple-100">
                            {player.power} poder • {player.stickers} figurinhas
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-400 block">
                          R$ {playerPrize.toFixed(2)}
                        </span>
                        <span className="text-xs text-purple-100">
                          {(playerPercentage * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Red Team Ranking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-red-400">Time Vermelho</h3>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold">{mockSeasonData.redTeamPower.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-purple-100">Poder Total</p>
                </div>
              </div>
              <div className="mb-4 bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pool do Time:</span>
                  <span className="font-bold text-red-300">R$ {redTeamPrize.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {mockRedTeamPlayers.slice(0, 10).map((player, index) => {
                  const playerPercentage = player.power / mockSeasonData.redTeamPower;
                  const playerPrize = redTeamPrize * playerPercentage;
                  
                  return (
                    <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                          #{index + 1}
                        </Badge>
                        <div>
                          <span className="block">{player.name}</span>
                          <span className="text-sm text-purple-100">
                            {player.power} poder • {player.stickers} figurinhas
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-400 block">
                          R$ {playerPrize.toFixed(2)}
                        </span>
                        <span className="text-xs text-purple-100">
                          {(playerPercentage * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderMarketplacePage = () => (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Mercadinho</h1>
          <p className="text-xl text-purple-100">
            Troque figurinhas com outros jogadores
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-8 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-purple-300" />
            <h3 className="text-xl font-bold mb-2">Em Breve!</h3>
            <p className="text-purple-100">
              O mercadinho será lançado em breve. Aqui você poderá trocar suas figurinhas com outros jogadores.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProfilePage = () => (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Meu Perfil</h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-8 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-purple-300" />
            <h3 className="text-xl font-bold mb-2">Em Desenvolvimento!</h3>
            <p className="text-purple-100">
              A página de perfil será implementada em breve com todas as suas estatísticas e conquistas.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} playerData={{...playerData, generalRanking: playerGeneralRanking}} />;
      case 'store':
        return <StorePage />;
      case 'collection':
        return renderCollectionPage();
      case 'ranking':
        return renderRankingPage();
      case 'marketplace':
        return renderMarketplacePage();
      case 'profile':
        return renderProfilePage();
      default:
        return <HomePage onNavigate={setCurrentPage} playerData={{...playerData, generalRanking: playerGeneralRanking}} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
