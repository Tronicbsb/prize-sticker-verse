
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  Package, 
  Trophy, 
  Store, 
  User,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'collection', label: 'Coleção', icon: Package },
  { id: 'store', label: 'Loja', icon: Store },
  { id: 'ranking', label: 'Ranking', icon: Trophy },
  { id: 'marketplace', label: 'Mercadinho', icon: Store },
  { id: 'profile', label: 'Perfil', icon: User },
];

export const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <Card className="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center p-2 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 transition-all duration-200",
                  currentPage === item.id && "bg-purple-600 text-white shadow-lg"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-50 bg-purple-600 text-white shadow-lg"
          size="icon"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <Card className="fixed top-16 right-4 z-40 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col p-2 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 justify-start transition-all duration-200",
                      currentPage === item.id && "bg-purple-600 text-white"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </>
  );
};
