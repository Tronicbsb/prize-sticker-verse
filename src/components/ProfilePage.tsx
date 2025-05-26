import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Store, 
  Wallet,
  Calendar,
  Trophy,
  Zap,
  PiggyBank,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { PlayerProfile, PlayerStats, FinancialActivity } from '@/types/profile';

// Dados de exemplo do jogador baseados na coleção atual
const mockPlayerProfile: PlayerProfile = {
  id: '1',
  name: 'João Silva',
  avatar: '/lovable-uploads/e45ba7db-0017-43b4-b3a3-6295d9b5afff.png',
  pixKey: 'joao.silva@email.com',
  balance: 1250.50,
  joinDate: new Date('2024-01-15'),
  totalCards: 6,
  totalPower: 462,
  team: 'blue'
};

const mockPlayerStats: PlayerStats = {
  cardsFromStore: 8,
  cardsSoldMarketplace: 3,
  cardsBoughtMarketplace: 1,
  totalSpentStore: 480.00,
  totalSpentMarketplace: 150.00,
  totalEarnedMarketplace: 220.00,
  totalDeposited: 1000.00
};

const mockFinancialHistory: FinancialActivity[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 500.00,
    description: 'Depósito via PIX',
    date: new Date('2024-05-20')
  },
  {
    id: '2',
    type: 'store_purchase',
    amount: -80.00,
    description: 'Compra de pacote épico',
    date: new Date('2024-05-19'),
    cardName: 'Senhor das Trevas'
  },
  {
    id: '3',
    type: 'marketplace_sale',
    amount: 120.00,
    description: 'Venda no mercadinho',
    date: new Date('2024-05-18'),
    cardName: 'Dragão Ancestral'
  },
  {
    id: '4',
    type: 'marketplace_purchase',
    amount: -50.00,
    description: 'Compra no mercadinho',
    date: new Date('2024-05-17'),
    cardName: 'Guerreiro Sagrado'
  },
  {
    id: '5',
    type: 'store_purchase',
    amount: -25.00,
    description: 'Compra de pacote raro',
    date: new Date('2024-05-16'),
    cardName: 'Bruxa Ancestral'
  },
  {
    id: '6',
    type: 'deposit',
    amount: 500.00,
    description: 'Depósito via PIX',
    date: new Date('2024-05-15')
  }
];

export const ProfilePage = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case 'store_purchase':
        return <Store className="w-4 h-4 text-blue-600" />;
      case 'marketplace_sale':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'marketplace_purchase':
        return <ShoppingCart className="w-4 h-4 text-orange-600" />;
      default:
        return <Wallet className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (amount: number) => {
    return amount > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header do Perfil */}
        <Card className="mb-6 bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={mockPlayerProfile.avatar} alt={mockPlayerProfile.name} />
                <AvatarFallback className="text-2xl">
                  {mockPlayerProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">{mockPlayerProfile.name}</h1>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                  <Badge className={`${mockPlayerProfile.team === 'blue' ? 'bg-blue-600' : 'bg-red-600'} text-white`}>
                    Time {mockPlayerProfile.team === 'blue' ? 'Azul' : 'Vermelho'}
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    <Trophy className="w-3 h-3 mr-1" />
                    {mockPlayerProfile.totalCards} cartas
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    <Zap className="w-3 h-3 mr-1" />
                    {mockPlayerProfile.totalPower} poder
                  </Badge>
                </div>
                <p className="text-gray-600">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Membro desde {formatDate(mockPlayerProfile.joinDate)}
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <PiggyBank className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(mockPlayerProfile.balance)}
                  </div>
                  <p className="text-sm text-gray-600">Saldo atual</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Adicionar Saldo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs com informações detalhadas */}
        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger value="stats" className="text-gray-700 data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Estatísticas
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-gray-700 data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-gray-700 data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Aba de Estatísticas */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Store className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{mockPlayerStats.cardsFromStore}</div>
                  <p className="text-sm text-gray-600">Cartas da Loja</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900">{mockPlayerStats.cardsSoldMarketplace}</div>
                  <p className="text-sm text-gray-600">Cartas Vendidas</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-4 text-center">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold text-gray-900">{mockPlayerStats.cardsBoughtMarketplace}</div>
                  <p className="text-sm text-gray-600">Cartas Compradas</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Wallet className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(mockPlayerStats.totalDeposited)}</div>
                  <p className="text-sm text-gray-600">Total Depositado</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    Gastos Totais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Na Loja:</span>
                      <span className="text-red-600">{formatCurrency(mockPlayerStats.totalSpentStore)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">No Mercadinho:</span>
                      <span className="text-red-600">{formatCurrency(mockPlayerStats.totalSpentMarketplace)}</span>
                    </div>
                    <Separator className="bg-gray-200" />
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-red-600">
                        {formatCurrency(mockPlayerStats.totalSpentStore + mockPlayerStats.totalSpentMarketplace)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Ganhos Totais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vendas Mercadinho:</span>
                      <span className="text-green-600">{formatCurrency(mockPlayerStats.totalEarnedMarketplace)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Depósitos:</span>
                      <span className="text-green-600">{formatCurrency(mockPlayerStats.totalDeposited)}</span>
                    </div>
                    <Separator className="bg-gray-200" />
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900">Total Entrada:</span>
                      <span className="text-green-600">
                        {formatCurrency(mockPlayerStats.totalEarnedMarketplace + mockPlayerStats.totalDeposited)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-blue-500" />
                    Balanço Líquido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {formatCurrency(
                        (mockPlayerStats.totalEarnedMarketplace + mockPlayerStats.totalDeposited) -
                        (mockPlayerStats.totalSpentStore + mockPlayerStats.totalSpentMarketplace)
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Lucro/Prejuízo total</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Financeira */}
          <TabsContent value="financial">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Histórico de Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockFinancialHistory.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        {getActivityIcon(activity.type)}
                        <div>
                          <p className="text-gray-900 font-medium">{activity.description}</p>
                          {activity.cardName && (
                            <p className="text-sm text-gray-600">{activity.cardName}</p>
                          )}
                          <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${getActivityColor(activity.amount)}`}>
                        {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Configurações */}
          <TabsContent value="settings">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Informações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Chave PIX</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <CreditCard className="w-4 h-4 text-green-600" />
                    <span className="font-mono text-gray-900">{mockPlayerProfile.pixKey}</span>
                    <Button size="sm" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
                      Editar
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Nome do Jogador</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900">{mockPlayerProfile.name}</span>
                    <Button size="sm" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Sacar Dinheiro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
