
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

  // Updated player's stickers with new images and powers
  const playerStickers = [
    { id: '1', power: 35, team: 'blue' as const }, // ARQUEIRO ÉLFICO - same team
    { id: '2', power: 80, team: 'blue' as const }, // SÁBIO ANCIÃO - same team
    { id: '3', power: 200, team: 'red' as const }, // FEITIÇO CÓSMICO - opposite team (100 effective)
    { id: '4', power: 90, team: 'blue' as const }, // PALADINO SAGRADO - same team
    { id: '5', power: 75, team: 'red' as const }, // GUERREIRO SOMBRIO - opposite team (37.5 = 37 effective)
    { id: '6', power: 45, team: 'blue' as const }, // MAGO ELEMENTAL - same team
    { id: '7', power: 250, team: 'red' as const }, // REI SOMBRIO - opposite team (125 effective)
  ];

  const playerTeam = "blue" as "blue" | "red";
  
  // Calculate actual total power with 7 stickers
  const calculateTotalPower = () => {
    return playerStickers.reduce((total, sticker) => {
      const isOppositeTeam = sticker.team !== playerTeam;
      const effectivePower = isOppositeTeam ? Math.floor(sticker.power / 2) : sticker.power;
      return total + effectivePower;
    }, 0);
  };

  const actualTotalPower = calculateTotalPower(); // Should be 35 + 80 + 100 + 90 + 37 + 45 + 125 = 512

  const playerData = {
    team: playerTeam,
    ranking: actualTotalPower >= 500 ? 6 : 10, // Better ranking with higher power
    generalRanking: actualTotalPower >= 500 ? 18 : 30, // Better general ranking
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
