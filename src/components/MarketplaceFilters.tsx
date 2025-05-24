
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { MarketplaceFilters } from '@/types/marketplace';

interface MarketplaceFiltersProps {
  filters: MarketplaceFilters;
  onFiltersChange: (filters: MarketplaceFilters) => void;
}

export const MarketplaceFiltersComponent = ({ filters, onFiltersChange }: MarketplaceFiltersProps) => {
  const updateFilter = (key: keyof MarketplaceFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      rarity: 'all',
      team: 'all',
      priceRange: { min: 0, max: 10000 },
      sortBy: 'price',
      sortOrder: 'asc',
      listingType: 'all'
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5" />
        <h3 className="text-lg font-bold">Filtros</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="ml-auto text-purple-200 hover:text-white"
        >
          <X className="w-4 h-4 mr-1" />
          Limpar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Busca */}
        <div>
          <label className="block text-sm font-medium mb-2">Buscar Carta</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Nome da carta..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Raridade */}
        <div>
          <label className="block text-sm font-medium mb-2">Raridade</label>
          <select
            value={filters.rarity}
            onChange={(e) => updateFilter('rarity', e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
          >
            <option value="all">Todas</option>
            <option value="common">Comum</option>
            <option value="uncommon">Incomum</option>
            <option value="rare">Rara</option>
            <option value="epic">Épica</option>
            <option value="mythic">Mítica</option>
          </select>
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium mb-2">Time</label>
          <select
            value={filters.team}
            onChange={(e) => updateFilter('team', e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
          >
            <option value="all">Todos</option>
            <option value="blue">Time Azul</option>
            <option value="red">Time Vermelho</option>
          </select>
        </div>

        {/* Tipo de Listagem */}
        <div>
          <label className="block text-sm font-medium mb-2">Tipo</label>
          <select
            value={filters.listingType}
            onChange={(e) => updateFilter('listingType', e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
          >
            <option value="all">Todos</option>
            <option value="auction">Leilão</option>
            <option value="fixed">Preço Fixo</option>
          </select>
        </div>
      </div>

      {/* Ordenação */}
      <div className="mt-4 flex gap-2 flex-wrap">
        <div className="flex gap-2">
          <span className="text-sm font-medium">Ordenar por:</span>
          {[
            { key: 'price', label: 'Preço' },
            { key: 'rarity', label: 'Raridade' },
            { key: 'timeLeft', label: 'Tempo' },
            { key: 'power', label: 'Poder' }
          ].map((sort) => (
            <Badge
              key={sort.key}
              variant={filters.sortBy === sort.key ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => updateFilter('sortBy', sort.key)}
            >
              {sort.label}
            </Badge>
          ))}
        </div>
        <Badge
          variant={filters.sortOrder === 'asc' ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {filters.sortOrder === 'asc' ? '↑ Crescente' : '↓ Decrescente'}
        </Badge>
      </div>
    </Card>
  );
};
