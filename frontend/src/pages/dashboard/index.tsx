"use client";

import { Header } from "@/components/header";
import { KPICard } from "@/components/kpi-card";
import { MiniChart } from "@/components/mini-chart";
import { AlertFeed } from "@/components/alert-feed";
import { AIAlphaSummary } from "@/components/ai-alpha-summary";
import { Wallet, TrendingUp, DollarSign, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

// Mock data for charts (keeping this for charts as they need historical data)
const generateMockData = (basePrice: number, trend: "up" | "down" = "up") => {
  return Array.from({ length: 24 }, (_, i) => {
    const variance = trend === "up" ? i * 2 : -i * 2;
    return {
      time: `${i}:00`,
      price: basePrice + variance + Math.random() * 50,
    };
  });
};

export default function Dashboard() {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo user ID for now
  const userId = "507f1f77bcf86cd799439011";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletsData, transactionsData, alertsData] = await Promise.all([
          api.getWallets(userId).catch(() => []), // Handle errors gracefully
          api.getTransactions(userId).catch(() => []),
          api.getAlerts(userId).catch(() => []),
        ]);
        setWallets(walletsData);
        setTransactions(transactionsData);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate KPIs based on real data (simplified logic)
  const totalPortfolioValue = wallets.length * 1000; // Mock calculation
  const activePositions = transactions.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-6 max-w-[1920px] mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard
            title="Total Portfolio Value"
            value={`$${totalPortfolioValue.toLocaleString()}`}
            change={12.5}
            changeLabel="7D"
            trend="up"
            icon={<Wallet className="h-5 w-5 text-[var(--success)]" />}
          />
          <KPICard
            title="Unrealized PnL"
            value="$15,234.21"
            change={8.3}
            changeLabel="7D"
            trend="up"
            icon={<TrendingUp className="h-5 w-5 text-[var(--success)]" />}
          />
          <KPICard
            title="Total TVL Tracked"
            value="$8.4M"
            change={-2.1}
            changeLabel="24H"
            trend="down"
            icon={<DollarSign className="h-5 w-5 text-[var(--danger)]" />}
          />
          <KPICard
            title="Active Positions"
            value={activePositions.toString()}
            change={4.5}
            changeLabel="New"
            trend="up"
            icon={<Activity className="h-5 w-5 text-[var(--success)]" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Multi-Chart View - 2x2 Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MiniChart
                title="Ethereum"
                symbol="ETH/USD"
                price="$3,245.67"
                change={5.2}
                data={generateMockData(3200, "up")}
              />
              <MiniChart
                title="Bitcoin"
                symbol="BTC/USD"
                price="$68,432.10"
                change={3.8}
                data={generateMockData(67500, "up")}
              />
              <MiniChart
                title="Solana"
                symbol="SOL/USD"
                price="$142.34"
                change={-1.2}
                data={generateMockData(144, "down")}
              />
              <MiniChart
                title="Polygon"
                symbol="MATIC/USD"
                price="$0.87"
                change={12.5}
                data={generateMockData(0.75, "up")}
              />
            </div>

            {/* Alerts Feed */}
            <AlertFeed />
          </div>

          {/* AI Alpha Summary */}
          <div className="lg:col-span-1">
            <AIAlphaSummary />
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
            <div className="text-xl font-bold">$42.8B</div>
            <div className="text-xs text-[var(--success)] mt-1">+18.2%</div>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <div className="text-sm text-muted-foreground mb-1">Gas Price (Gwei)</div>
            <div className="text-xl font-bold">24</div>
            <div className="text-xs text-muted-foreground mt-1">Standard</div>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <div className="text-sm text-muted-foreground mb-1">Fear & Greed</div>
            <div className="text-xl font-bold">72</div>
            <div className="text-xs text-[var(--success)] mt-1">Greed</div>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <div className="text-sm text-muted-foreground mb-1">Tracked Wallets</div>
            <div className="text-xl font-bold">{wallets.length}</div>
            <div className="text-xs text-primary mt-1">Active</div>
          </div>
        </div>
      </main>
    </div>
  );
}