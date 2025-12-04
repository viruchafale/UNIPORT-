"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  PieChart,
} from "lucide-react";

// Mock historical PnL data
const historicalPnL = Array.from({ length: 30 }, (_, i) => {
  const baseValue = 100000;
  const trend = i * 800;
  const variance = Math.sin(i / 3) * 3000;
  return {
    date: `Day ${i + 1}`,
    portfolio: baseValue + trend + variance,
    benchmark: baseValue + i * 600,
  };
});

interface Holding {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  allocation: number;
  costBasis: string;
  pnl: number;
  chain: string;
}

const holdings: Holding[] = [
  { symbol: "ETH", name: "Ethereum", balance: "25.5", value: "$82,765.59", allocation: 42, costBasis: "$70,420.00", pnl: 17.5, chain: "Ethereum" },
  { symbol: "BTC", name: "Bitcoin", balance: "0.85", value: "$58,167.29", allocation: 29, costBasis: "$55,200.00", pnl: 5.4, chain: "Bitcoin" },
  { symbol: "SOL", name: "Solana", balance: "180", value: "$25,621.20", allocation: 13, costBasis: "$28,800.00", pnl: -11.0, chain: "Solana" },
  { symbol: "MATIC", name: "Polygon", balance: "12,500", value: "$10,875.00", allocation: 5.5, costBasis: "$9,500.00", pnl: 14.5, chain: "Polygon" },
  { symbol: "UNI", name: "Uniswap", balance: "450", value: "$5,602.50", allocation: 2.8, costBasis: "$6,300.00", pnl: -11.1, chain: "Ethereum" },
  { symbol: "AVAX", name: "Avalanche", balance: "220", value: "$8,562.40", allocation: 4.3, costBasis: "$7,920.00", pnl: 8.1, chain: "Avalanche" },
  { symbol: "LINK", name: "Chainlink", balance: "850", value: "$12,495.00", allocation: 6.3, costBasis: "$11,050.00", pnl: 13.1, chain: "Ethereum" },
];

interface DeFiPosition {
  protocol: string;
  type: string;
  pair: string;
  deposited: string;
  currentValue: string;
  apy: number;
  rewards: string;
  impermanentLoss: number;
  chain: string;
}

const defiPositions: DeFiPosition[] = [
  {
    protocol: "Uniswap V3",
    type: "LP",
    pair: "ETH/USDC",
    deposited: "$25,000",
    currentValue: "$26,450",
    apy: 24.5,
    rewards: "$125.40",
    impermanentLoss: -2.3,
    chain: "Ethereum",
  },
  {
    protocol: "Aave",
    type: "Lending",
    pair: "USDC",
    deposited: "$15,000",
    currentValue: "$15,285",
    apy: 5.2,
    rewards: "$78.20",
    impermanentLoss: 0,
    chain: "Polygon",
  },
  {
    protocol: "Curve",
    type: "LP",
    pair: "3pool",
    deposited: "$20,000",
    currentValue: "$20,180",
    apy: 8.7,
    rewards: "$95.60",
    impermanentLoss: -0.5,
    chain: "Ethereum",
  },
];

export default function PortfolioPage() {
  const totalValue = 124567.89;
  const totalPnL = 15234.21;
  const totalPnLPercent = 12.5;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6 max-w-[1920px] mx-auto space-y-6">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                ${totalValue.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-sm text-[var(--success)]">
                <TrendingUp className="h-4 w-4" />
                +{totalPnLPercent}% (7D)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total PnL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 text-[var(--success)]">
                +${totalPnL.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Unrealized + Realized
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cost Basis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                ${(totalValue - totalPnL).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Invested
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historical PnL Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Portfolio Performance (30D)</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">7D</Button>
                <Button variant="default" size="sm">30D</Button>
                <Button variant="outline" size="sm">90D</Button>
                <Button variant="outline" size="sm">1Y</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalPnL}>
                <defs>
                  <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value: any) => `$${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  stroke="var(--muted-foreground)"
                  fillOpacity={1}
                  fill="url(#colorBenchmark)"
                  name="Market Benchmark"
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPortfolio)"
                  name="Your Portfolio"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Token Holdings</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {holdings.length} Assets
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Asset</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Balance</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Value</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Cost Basis</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">PnL</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Allocation</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Chain</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => (
                    <tr key={holding.symbol} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-bold">{holding.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <div className="font-semibold">{holding.symbol}</div>
                            <div className="text-xs text-muted-foreground">{holding.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2 font-mono">{holding.balance}</td>
                      <td className="text-right py-4 px-2 font-semibold">{holding.value}</td>
                      <td className="text-right py-4 px-2 text-muted-foreground">{holding.costBasis}</td>
                      <td className="text-right py-4 px-2">
                        <span className={`inline-flex items-center gap-1 font-semibold ${holding.pnl >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                          {holding.pnl >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {holding.pnl >= 0 ? "+" : ""}{holding.pnl}%
                        </span>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="flex items-center gap-2 justify-end">
                          <Progress value={holding.allocation} className="w-16 h-2" />
                          <span className="text-sm font-medium">{holding.allocation}%</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <Badge variant="secondary" className="text-xs">{holding.chain}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* DeFi Positions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">DeFi Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {defiPositions.map((position, idx) => (
                <Card key={idx} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{position.protocol}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {position.type} • {position.pair}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {position.chain}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Deposited</span>
                        <span className="font-semibold">{position.deposited}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current Value</span>
                        <span className="font-semibold">{position.currentValue}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">APY</span>
                        <span className="font-semibold text-[var(--success)]">{position.apy}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rewards</span>
                        <span className="font-semibold text-[var(--success)]">{position.rewards}</span>
                      </div>
                      {position.impermanentLoss !== 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">IL</span>
                          <span className={`font-semibold ${position.impermanentLoss < 0 ? "text-[var(--danger)]" : "text-[var(--success)]"}`}>
                            {position.impermanentLoss}%
                          </span>
                        </div>
                      )}
                    </div>

                    <Button variant="outline" className="w-full gap-2" size="sm">
                      Manage Position
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
