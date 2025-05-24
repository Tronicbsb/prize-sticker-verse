import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { CollectionPage } from "@/components/CollectionPage";
import { RankingPage } from "@/components/RankingPage";
import { StorePage } from "@/components/StorePage";
import { MarketplacePage } from '@/components/MarketplacePage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const playerData = {
    team: "blue" as "blue" | "red",
    ranking: 42,
    generalRanking: 189,
    totalPower: 7850,
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
