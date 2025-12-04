"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, TrendingDown, ArrowRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AISignal {
  id: string;
  token: string;
  action: "buy" | "sell" | "neutral";
  confidence: number;
  setup: string;
  rationale: string;
  price: string;
}

const mockSignals: AISignal[] = [
  {
    id: "1",
    token: "ETH/USD",
    action: "buy",
    confidence: 85,
    setup: "Bullish Burst",
    rationale: "MACD Momentum divergence confirmed by high NVT ratio. Accumulation detected in whale wallets (+15% in 24h). RSI recovering from oversold with volume increase.",
    price: "$3,245",
  },
  {
    id: "2",
    token: "MATIC/USD",
    action: "buy",
    confidence: 72,
    setup: "Breakout Confirm",
    rationale: "Price action breaking key resistance at $0.85 with strong volume. On-chain metrics show increased network activity (+22% active addresses).",
    price: "$0.87",
  },
  {
    id: "3",
    token: "SOL/USD",
    action: "neutral",
    confidence: 58,
    setup: "Consolidation",
    rationale: "Trading in tight range. Waiting for volume confirmation. Whale movements minimal. Recommend wait for clear directional bias.",
    price: "$142",
  },
];

export function AIAlphaSummary() {
  const getActionColor = (action: AISignal["action"]) => {
    switch (action) {
      case "buy":
        return "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20";
      case "sell":
        return "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getActionIcon = (action: AISignal["action"]) => {
    if (action === "buy") return <TrendingUp className="h-3 w-3" />;
    if (action === "sell") return <TrendingDown className="h-3 w-3" />;
    return <ArrowRight className="h-3 w-3" />;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">AI Alpha Signals</CardTitle>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Top 3
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockSignals.map((signal, idx) => (
            <div
              key={signal.id}
              className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{signal.token}</span>
                    <Badge variant="outline" className={getActionColor(signal.action)}>
                      <span className="flex items-center gap-1">
                        {getActionIcon(signal.action)}
                        {signal.action.toUpperCase()}
                      </span>
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {signal.setup} • {signal.price}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                  <div className="text-lg font-bold text-primary">{signal.confidence}%</div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded bg-muted/50 text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p className="text-xs">{signal.rationale}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-muted-foreground line-clamp-2">{signal.rationale}</p>
              </div>

              <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                View Details <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
