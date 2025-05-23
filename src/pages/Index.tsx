
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { StorePage } from '@/components/StorePage';
import { StickerCard } from '@/components/StickerCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sticker } from '@/types';
import { Trophy, Users, Package } from 'lucide-react';

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

  const renderCollectionPage = () => (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Minha Coleção</h1>
          <p className="text-xl text-purple-100 mb-6">
            Suas figurinhas e estatísticas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold text-blue-400">{mockStickers.length}</h3>
              <p className="text-purple-100">Figurinhas</p>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold text-yellow-400">
                {mockStickers.reduce((sum, sticker) => sum + sticker.power, 0)}
              </h3>
              <p className="text-purple-100">Poder Total</p>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-bold text-green-400">#15</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blue Team Ranking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4 text-center">Time Azul</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((position) => (
                  <div key={position} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        #{position}
                      </Badge>
                      <span>Jogador {position}</span>
                    </div>
                    <span className="font-bold text-blue-400">
                      {(1000 - position * 50).toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Red Team Ranking */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4 text-center">Time Vermelho</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((position) => (
                  <div key={position} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        #{position}
                      </Badge>
                      <span>Jogador {position}</span>
                    </div>
                    <span className="font-bold text-red-400">
                      {(950 - position * 45).toLocaleString()} pts
                    </span>
                  </div>
                ))}
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
        return <HomePage onNavigate={setCurrentPage} />;
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
        return <HomePage onNavigate={setCurrentPage} />;
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
