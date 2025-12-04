"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Maximize2,
  Plus,
  Sparkles,
  Info,
} from "lucide-react";
import { useState } from "react";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Generate mock price data with AI signals
const generatePriceData = () => {
  const basePrice = 3200;
  const data = [];
  
  for (let i = 0; i < 100; i++) {
    const price = basePrice + Math.sin(i / 10) * 200 + Math.random() * 100;
    const volume = 1000000 + Math.random() * 5000000;
    data.push({
      time: `${i}h`,
      price: price,
      volume: volume,
      ma20: basePrice + Math.sin(i / 10) * 180,
      ma50: basePrice + Math.sin(i / 15) * 150,
    });
  }
  
  return data;
};

// AI Signal markers
const aiSignals = [
  {
    id: "1",
    position: 25,
    type: "buy",
    confidence: 85,
    setup: "Bullish Burst",
    rationale: "MACD Momentum divergence confirmed by high NVT ratio. Strong accumulation detected in whale wallets.",
    price: 3245,
  },
  {
    id: "2",
    position: 55,
    type: "sell",
    confidence: 72,
    setup: "Overbought RSI",
    rationale: "RSI above 70 on multiple timeframes. Volume declining while price rising - potential exhaustion.",
    price: 3420,
  },
  {
    id: "3",
    position: 78,
    type: "buy",
    confidence: 78,
    setup: "Support Bounce",
    rationale: "Price testing key support level with volume spike. Fibonacci 0.618 retracement holding strong.",
    price: 3180,
  },
];

const indicators = [
  { name: "RSI (14)", active: true },
  { name: "MACD", active: true },
  { name: "Bollinger Bands", active: false },
  { name: "EMA (20)", active: true },
  { name: "Volume", active: true },
  { name: "Stoch RSI", active: false },
  { name: "ATR", active: false },
  { name: "Ichimoku", active: false },
];

export default function ChartsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1H");
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);
  const [priceData] = useState(generatePriceData());

  const timeframes = ["5M", "15M", "1H", "4H", "1D", "1W"];

  // Custom dot for AI signals
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const signal = aiSignals.find(s => s.position === payload.index);
    
    if (!signal) return null;

    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill={signal.type === "buy" ? "var(--success)" : "var(--danger)"}
          stroke="white"
          strokeWidth={2}
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedSignal(signal.id)}
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={10}
          fontWeight="bold"
        >
          {signal.type === "buy" ? "B" : "S"}
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6 max-w-[1920px] mx-auto">
        {/* Chart Controls */}
        <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">ETH/USD</span>
              <Badge variant="secondary">Ethereum</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[var(--success)]">$3,245.67</span>
              <span className="text-sm text-[var(--success)] flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +5.2%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={selectedTimeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Advanced Price Chart
                  <TooltipProvider>
                    <TooltipUI>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 cursor-help">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="text-xs text-primary">AI Signals Active</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p className="text-xs">
                          AI-powered signals are displayed directly on the chart. 
                          Green markers (B) indicate buy signals, red markers (S) indicate sell signals.
                          Click on markers for detailed analysis.
                        </p>
                      </TooltipContent>
                    </TooltipUI>
                  </TooltipProvider>
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <ComposedChart data={priceData.map((d, i) => ({ ...d, index: i }))}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="var(--muted-foreground)" 
                    fontSize={12}
                    interval={9}
                  />
                  <YAxis 
                    stroke="var(--muted-foreground)" 
                    fontSize={12}
                    domain={['dataMin - 100', 'dataMax + 100']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="var(--chart-1)"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                  <Line
                    type="monotone"
                    dataKey="ma20"
                    stroke="var(--warning)"
                    strokeWidth={2}
                    dot={false}
                    name="MA20"
                  />
                  <Line
                    type="monotone"
                    dataKey="ma50"
                    stroke="var(--chart-5)"
                    strokeWidth={2}
                    dot={false}
                    name="MA50"
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="var(--chart-1)"
                    strokeWidth={3}
                    dot={<CustomDot />}
                    name="Price"
                  />
                </ComposedChart>
              </ResponsiveContainer>

              {/* AI Signal Details */}
              {selectedSignal && (
                <div className="mt-4 p-4 rounded-lg border bg-muted/50">
                  {aiSignals.filter(s => s.id === selectedSignal).map((signal) => (
                    <div key={signal.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              signal.type === "buy"
                                ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20"
                                : "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20"
                            }
                          >
                            {signal.type.toUpperCase()} SIGNAL
                          </Badge>
                          <span className="text-sm font-semibold">{signal.setup}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Confidence</div>
                          <div className="text-lg font-bold text-primary">{signal.confidence}%</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{signal.rationale}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Execute Trade
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedSignal(null)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Indicators Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Technical Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {indicators.map((indicator) => (
                  <div
                    key={indicator.name}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      indicator.active ? "bg-primary/10 border-primary/20" : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{indicator.name}</span>
                    <div
                      className={`h-4 w-4 rounded-full border-2 ${
                        indicator.active
                          ? "bg-primary border-primary"
                          : "border-muted-foreground"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Indicator
              </Button>

              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-2">RSI (14)</div>
                  <div className="text-2xl font-bold mb-1">68.5</div>
                  <div className="flex items-center gap-1 text-xs text-[var(--warning)]">
                    <Activity className="h-3 w-3" />
                    Approaching Overbought
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-2">MACD</div>
                  <div className="text-sm font-semibold mb-1">Bullish Crossover</div>
                  <div className="flex items-center gap-1 text-xs text-[var(--success)]">
                    <TrendingUp className="h-3 w-3" />
                    Momentum Increasing
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-2">24h Volume</div>
                  <div className="text-2xl font-bold mb-1">$24.5B</div>
                  <div className="flex items-center gap-1 text-xs text-[var(--success)]">
                    <TrendingUp className="h-3 w-3" />
                    +18.2% vs avg
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Signals Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiSignals.map((signal) => (
            <Card key={signal.id} className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge
                      variant="outline"
                      className={
                        signal.type === "buy"
                          ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20"
                          : "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20"
                      }
                    >
                      {signal.type.toUpperCase()}
                    </Badge>
                    <div className="text-sm font-semibold mt-2">{signal.setup}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Confidence</div>
                    <div className="text-lg font-bold text-primary">{signal.confidence}%</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{signal.rationale}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
