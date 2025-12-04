"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, TrendingUp, Wallet, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Alert {
  id: string;
  type: "whale" | "technical" | "liquidity" | "price";
  severity: "high" | "medium" | "low";
  message: string;
  timestamp: Date;
  token?: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "whale",
    severity: "high",
    message: "Whale Deposit: 5M $ETH to CEX detected",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    token: "ETH",
  },
  {
    id: "2",
    type: "technical",
    severity: "medium",
    message: "RSI overbought on $BTC 4H timeframe",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    token: "BTC",
  },
  {
    id: "3",
    type: "liquidity",
    severity: "high",
    message: "Large LP withdrawal detected on $UNI/ETH",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    token: "UNI",
  },
  {
    id: "4",
    type: "price",
    severity: "low",
    message: "$MATIC up 8% in last hour",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    token: "MATIC",
  },
];

export function AlertFeed() {
  const getIcon = (type: Alert["type"]) => {
    switch (type) {
      case "whale":
        return <Wallet className="h-4 w-4" />;
      case "technical":
        return <Activity className="h-4 w-4" />;
      case "liquidity":
        return <AlertTriangle className="h-4 w-4" />;
      case "price":
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20";
      case "medium":
        return "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20";
      case "low":
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Real-Time Alerts</CardTitle>
          <Badge variant="outline" className="bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20">
            {mockAlerts.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className={`p-2 rounded-md ${getSeverityColor(alert.severity)}`}>
                  {getIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-tight">{alert.message}</p>
                    {alert.token && (
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {alert.token}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
