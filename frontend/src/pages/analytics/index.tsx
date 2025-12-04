
"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Search,
  Trash2,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
interface WatchlistWallet {
  id: string;
  address: string;
  label: string;
  balance: string;
  totalValue: string;
  change24h: number;
  chain: string;
  tags: string[];
}

const watchlist: WatchlistWallet[] = [
  {
    id: "1",
    address: "0x7a9f...3d2e",
    label: "Whale #1 - DeFi Veteran",
    balance: "2,450 ETH",
    totalValue: "$7.95M",
    change24h: 5.2,
    chain: "Ethereum",
    tags: ["Whale", "DeFi"],
  },
  {
    id: "2",
    address: "0x4b8c...9f1a",
    label: "Smart Money Trader",
    balance: "850 ETH",
    totalValue: "$2.76M",
    change24h: -2.1,
    chain: "Ethereum",
    tags: ["Smart Money", "Trading"],
  },
  {
    id: "3",
    address: "Hx9K...mP4w",
    label: "Solana Whale",
    balance: "125K SOL",
    totalValue: "$17.8M",
    change24h: 12.5,
    chain: "Solana",
    tags: ["Whale", "HODLer"],
  },
];

interface Transaction {
  id: string;
  type: string;
  action: string;
  token: string;
  amount: string;
  value: string;
  from: string;
  to: string;
  timestamp: Date;
  status: "success" | "pending" | "failed";
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    type: "swap",
    action: "Swap",
    token: "ETH → USDC",
    amount: "12.5 ETH",
    value: "$40,571",
    from: "0x7a9f...3d2e",
    to: "Uniswap V3",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "success",
  },
  {
    id: "2",
    type: "transfer",
    action: "Transfer",
    token: "USDT",
    amount: "50,000 USDT",
    value: "$50,000",
    from: "0x4b8c...9f1a",
    to: "Binance",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: "success",
  },
  {
    id: "3",
    type: "deposit",
    action: "Deposit LP",
    token: "ETH/USDC",
    amount: "25 ETH + 81K USDC",
    value: "$162,283",
    from: "0x7a9f...3d2e",
    to: "Curve",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    status: "success",
  },
  {
    id: "4",
    type: "approval",
    action: "Approval",
    token: "UNI",
    amount: "Unlimited",
    value: "-",
    from: "0x7a9f...3d2e",
    to: "Uniswap Router",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: "success",
  },
];

// Whale metrics data
const tokenDistribution = [
  { name: "Top 10 Holders", value: 35, color: "var(--danger)" },
  { name: "Top 11-50", value: 28, color: "var(--warning)" },
  { name: "Top 51-100", value: 15, color: "var(--chart-1)" },
  { name: "Others", value: 22, color: "var(--success)" },
];

const activityData = [
  { day: "Mon", buys: 12, sells: 5 },
  { day: "Tue", buys: 15, sells: 8 },
  { day: "Wed", buys: 8, sells: 12 },
  { day: "Thu", buys: 20, sells: 6 },
  { day: "Fri", buys: 18, sells: 9 },
  { day: "Sat", buys: 10, sells: 7 },
  { day: "Sun", buys: 14, sells: 4 },
];

export default function AnalyticsPage() {
  const [searchAddress, setSearchAddress] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<string | null>("1");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Watchlist Management */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Watchlist</CardTitle>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search or add wallet..."
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {watchlist.map((wallet) => (
                    <div
                      key={wallet.id}
                      onClick={() => setSelectedWallet(wallet.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedWallet === wallet.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{wallet.label}</div>
                          <div className="text-xs text-muted-foreground font-mono truncate">
                            {wallet.address}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {wallet.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs">
                          {wallet.chain}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <div className="text-muted-foreground text-xs">Balance</div>
                          <div className="font-semibold">{wallet.balance}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-muted-foreground text-xs">Value</div>
                          <div className="font-semibold">{wallet.totalValue}</div>
                        </div>
                      </div>

                      <div
                        className={`mt-2 text-xs font-medium flex items-center gap-1 ${
                          wallet.change24h >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"
                        }`}
                      >
                        {wallet.change24h >= 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {wallet.change24h >= 0 ? "+" : ""}
                        {wallet.change24h}% (24h)
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Transaction Tracer & Whale Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Transaction History</CardTitle>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Live Feed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          tx.type === "swap"
                            ? "bg-primary/10 text-primary"
                            : tx.type === "transfer"
                            ? "bg-[var(--warning)]/10 text-[var(--warning)]"
                            : "bg-[var(--success)]/10 text-[var(--success)]"
                        }`}
                      >
                        <Activity className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="font-semibold">{tx.action}</div>
                            <div className="text-sm text-muted-foreground">{tx.token}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-semibold">{tx.amount}</div>
                            <div className="text-sm text-muted-foreground">{tx.value}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-mono">{tx.from}</span>
                          <span>→</span>
                          <span className="font-mono">{tx.to}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                          </span>
                          <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
                            View
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Whale Metrics Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Token Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Token Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={tokenDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {tokenDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="mt-4 space-y-2">
                    {tokenDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <span className="font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Pattern */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trading Activity (7D)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={activityData}>
                      <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                      <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Bar dataKey="buys" fill="var(--success)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="sells" fill="var(--danger)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20">
                      <div className="text-xs text-muted-foreground mb-1">Total Buys</div>
                      <div className="text-xl font-bold text-[var(--success)]">97</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/20">
                      <div className="text-xs text-muted-foreground mb-1">Total Sells</div>
                      <div className="text-xl font-bold text-[var(--danger)]">51</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Whale Movement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">Supply Held</div>
                  <div className="text-2xl font-bold mb-1">3.5%</div>
                  <div className="text-xs text-[var(--warning)]">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    Accumulating
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">Last CEX Deposit</div>
                  <div className="text-2xl font-bold mb-1">2.5M</div>
                  <div className="text-xs text-muted-foreground">$8.1M • 3h ago</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">Avg Hold Time</div>
                  <div className="text-2xl font-bold mb-1">45d</div>
                  <div className="text-xs text-[var(--success)]">Long-term holder</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-1">Win Rate</div>
                  <div className="text-2xl font-bold mb-1">68%</div>
                  <div className="text-xs text-[var(--success)]">Above average</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
