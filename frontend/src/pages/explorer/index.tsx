"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, TrendingUp, TrendingDown, ArrowUpDown, BarChart3, Users, Zap } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

interface Token {
  symbol: string;
  name: string;
  price: string;
  change24h: number;
  volume: string;
  liquidity: string;
  marketCap: string;
  chain: string;
}

const mockTokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", price: "$3,245.67", change24h: 5.2, volume: "$24.5B", liquidity: "$8.2B", marketCap: "$389B", chain: "Ethereum" },
  { symbol: "BTC", name: "Bitcoin", price: "$68,432.10", change24h: 3.8, volume: "$42.8B", liquidity: "$12.5B", marketCap: "$1.3T", chain: "Bitcoin" },
  { symbol: "SOL", name: "Solana", price: "$142.34", change24h: -1.2, volume: "$3.2B", liquidity: "$890M", marketCap: "$65B", chain: "Solana" },
  { symbol: "MATIC", name: "Polygon", price: "$0.87", change24h: 12.5, volume: "$580M", liquidity: "$320M", marketCap: "$8.1B", chain: "Polygon" },
  { symbol: "UNI", name: "Uniswap", price: "$12.45", change24h: 7.3, volume: "$420M", liquidity: "$1.2B", marketCap: "$7.4B", chain: "Ethereum" },
  { symbol: "AVAX", name: "Avalanche", price: "$38.92", change24h: -2.8, volume: "$680M", liquidity: "$540M", marketCap: "$15.2B", chain: "Avalanche" },
];

const supplyDistribution = [
  { name: "Whales (>1%)", value: 35, color: "var(--danger)" },
  { name: "Large Holders", value: 28, color: "var(--warning)" },
  { name: "Medium Holders", value: 22, color: "var(--chart-1)" },
  { name: "Retail", value: 15, color: "var(--success)" },
];

const networkActivity = [
  { name: "Mon", transactions: 120000, activeAddresses: 45000 },
  { name: "Tue", transactions: 135000, activeAddresses: 52000 },
  { name: "Wed", transactions: 145000, activeAddresses: 58000 },
  { name: "Thu", transactions: 152000, activeAddresses: 61000 },
  { name: "Fri", transactions: 168000, activeAddresses: 67000 },
  { name: "Sat", transactions: 142000, activeAddresses: 55000 },
  { name: "Sun", transactions: 138000, activeAddresses: 53000 },
];

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChain, setSelectedChain] = useState("all");
  const [sortBy, setSortBy] = useState("volume");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex p-6 max-w-[1920px] mx-auto gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tokens by name or symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="h-10 px-3 py-2 text-sm rounded-md border bg-background">
                    <option value="all">All Chains</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                    <option value="solana">Solana</option>
                    <option value="avalanche">Avalanche</option>
                  </select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Tokens</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  15,000+ DEXs • 13M Tokens
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Token</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">24h Change</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Volume</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Liquidity</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Market Cap</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Chain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTokens.map((token) => (
                      <tr key={token.symbol} className="border-b hover:bg-muted/50 cursor-pointer transition-colors">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-bold">{token.symbol.slice(0, 2)}</span>
                            </div>
                            <div>
                              <div className="font-semibold">{token.symbol}</div>
                              <div className="text-xs text-muted-foreground">{token.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-4 px-2 font-semibold">{token.price}</td>
                        <td className="text-right py-4 px-2">
                          <span className={`inline-flex items-center gap-1 ${token.change24h >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                            {token.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {token.change24h >= 0 ? "+" : ""}{token.change24h}%
                          </span>
                        </td>
                        <td className="text-right py-4 px-2">{token.volume}</td>
                        <td className="text-right py-4 px-2">{token.liquidity}</td>
                        <td className="text-right py-4 px-2">{token.marketCap}</td>
                        <td className="text-center py-4 px-2">
                          <Badge variant="secondary" className="text-xs">{token.chain}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* On-Chain Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supply Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Supply Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={supplyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {supplyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {supplyDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Network Health */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Network Health (7D)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={networkActivity}>
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar dataKey="activeAddresses" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">168K</div>
                    <div className="text-xs text-muted-foreground mt-1">Peak Transactions</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">67K</div>
                    <div className="text-xs text-muted-foreground mt-1">Active Addresses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Multi-Swap Sidebar */}
        <div className="w-80 shrink-0 hidden lg:block">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-base">Multi-Swap Execution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Swap Input 1 */}
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-2">From</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Input type="number" placeholder="0.0" className="flex-1" />
                    <select className="h-10 px-3 py-2 text-sm rounded-md border bg-background">
                      <option>ETH</option>
                      <option>USDC</option>
                      <option>USDT</option>
                    </select>
                  </div>
                  <div className="text-xs text-muted-foreground">Balance: 2.5 ETH</div>
                </div>

                <div className="flex justify-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Swap Output 1 */}
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-2">To</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Input type="number" placeholder="0.0" className="flex-1" />
                    <select className="h-10 px-3 py-2 text-sm rounded-md border bg-background">
                      <option>USDC</option>
                      <option>ETH</option>
                      <option>USDT</option>
                    </select>
                  </div>
                  <div className="text-xs text-muted-foreground">≈ $8,115.34</div>
                </div>

                <div className="space-y-2 p-3 rounded-lg bg-muted/30 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">1 ETH = 3,245.67 USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Fee</span>
                    <span className="font-medium">$8.42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slippage</span>
                    <span className="font-medium">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route</span>
                    <span className="font-medium">Uniswap V3</span>
                  </div>
                </div>

                <Button className="w-full gap-2">
                  <Zap className="h-4 w-4" />
                  Execute Swap
                </Button>

                <Button variant="outline" className="w-full">
                  Add Another Swap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
