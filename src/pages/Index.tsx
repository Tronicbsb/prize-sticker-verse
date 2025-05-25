
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { CollectionPage } from "@/components/CollectionPage";
import { RankingPage } from "@/components/RankingPage";
import { StorePage } from "@/components/StorePage";
import { MarketplacePage } from '@/components/MarketplacePage';
import { ProfilePage } from '@/components/ProfilePage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  // Calculate player's actual power based on their stickers
  const playerStickers = [
    { id: '1', power: 50, team: 'blue' as const }, // CAVALEIRO DOURADO - same team
    { id: '2', power: 200, team: 'red' as const }, // ANCESTRAL DRAGON - opposite team (100 effective)
    { id: '3', power: 10, team: 'blue' as const }, // MAGO DAS SOMBRAS - same team
    { id: '4', power: 75, team: 'red' as const }, // GUERREIRO SAGRADO - opposite team (37.5 = 37 effective)
    { id: '5', power: 15, team: 'blue' as const }, // BRUXA ANCESTRAL - same team
    { id: '6', power: 250, team: 'blue' as const }, // SENHOR DAS TREVAS - same team
  ];

  const playerTeam = "blue" as "blue" | "red";
  
  // Calculate actual total power
  const calculateTotalPower = () => {
    return playerStickers.reduce((total, sticker) => {
      const isOppositeTeam = sticker.team !== playerTeam;
      const effectivePower = isOppositeTeam ? Math.floor(sticker.power / 2) : sticker.power;
      return total + effectivePower;
    }, 0);
  };

  const actualTotalPower = calculateTotalPower(); // Should be 50 + 100 + 10 + 37 + 15 + 250 = 462

  const playerData = {
    team: playerTeam,
    ranking: actualTotalPower >= 400 ? 8 : 12, // Better ranking with higher power
    generalRanking: actualTotalPower >= 400 ? 25 : 42, // Better general ranking
    totalPower: actualTotalPower,
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} playerData={playerData} />;
      case 'collection':
        return <CollectionPage onNavigate={setCurrentPage} playerData={playerData} />;
      case 'ranking':
        return <RankingPage playerData={playerData} />;
      case 'store':
        return <StorePage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} playerData={playerData} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-purple-900 text-white">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
