"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Bell,
  AlertTriangle,
  TrendingUp,
  Activity,
  Wallet,
  Settings,
  Trash2,
  Edit,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { api } from "@/services/api";


interface Alert {
  id: string;
  name: string;
  type: "technical" | "onchain" | "whale" | "custom";
  condition: string;
  token?: string;
  value?: string;
  isActive: boolean;
  lastTriggered?: Date;
  triggerCount: number;
}

const configuredAlerts: Alert[] = [
  {
    id: "1",
    name: "ETH RSI Overbought",
    type: "technical",
    condition: "RSI > 70 on 4H",
    token: "ETH",
    isActive: true,
    lastTriggered: new Date(Date.now() - 1000 * 60 * 15),
    triggerCount: 24,
  },
  {
    id: "2",
    name: "Whale Transfer Alert",
    type: "whale",
    condition: "Transfer > $1M",
    token: "ETH",
    value: "$1,000,000",
    isActive: true,
    lastTriggered: new Date(Date.now() - 1000 * 60 * 5),
    triggerCount: 8,
  },
  {
    id: "3",
    name: "TVL Decrease",
    type: "onchain",
    condition: "TVL decrease > 10%",
    token: "UNI",
    isActive: true,
    triggerCount: 3,
  },
  {
    id: "4",
    name: "Price Target",
    type: "custom",
    condition: "Price crosses $3,500",
    token: "ETH",
    value: "$3,500",
    isActive: false,
    triggerCount: 0,
  },
];

interface TriggeredAlert {
  id: string;
  alertName: string;
  type: "technical" | "onchain" | "whale" | "price";
  severity: "high" | "medium" | "low";
  message: string;
  timestamp: Date;
  token?: string;
  details: string;
}

const triggeredAlerts: TriggeredAlert[] = [
  {
    id: "1",
    alertName: "Whale Transfer Alert",
    type: "whale",
    severity: "high",
    message: "Whale Deposit: 5M $ETH to CEX detected",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    token: "ETH",
    details: "Address 0x7a9f...3d2e transferred 5,000 ETH ($16.2M) to Binance",
  },
  {
    id: "2",
    alertName: "ETH RSI Overbought",
    type: "technical",
    severity: "medium",
    message: "RSI overbought on $BTC 4H timeframe",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    token: "BTC",
    details: "RSI reached 72.5 on the 4-hour chart, indicating overbought conditions",
  },
  {
    id: "3",
    alertName: "TVL Decrease",
    type: "onchain",
    severity: "high",
    message: "Large LP withdrawal detected on $UNI/ETH",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    token: "UNI",
    details: "TVL decreased by 15% ($12M) in the last hour on Uniswap V3",
  },
  {
    id: "4",
    alertName: "Price Movement",
    type: "price",
    severity: "low",
    message: "$MATIC up 8% in last hour",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    token: "MATIC",
    details: "Price increased from $0.80 to $0.87 with 45% volume increase",
  },
];

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>(configuredAlerts); // Initialize with mock, then fetch
  const userId = "507f1f77bcf86cd799439011"; // Demo user ID

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await api.getAlerts(userId);
        // Map backend alerts to frontend interface
        const mappedAlerts: Alert[] = data.map((a: any) => ({
          id: a._id,
          name: `${a.symbol} ${a.condition} ${a.targetPrice}`,
          type: "custom",
          condition: `${a.condition} ${a.targetPrice}`,
          token: a.symbol,
          value: a.targetPrice.toString(),
          isActive: true,
          triggerCount: 0,
        }));
        // Merge with mock alerts or replace. For now, let's append them to see integration.
        setAlerts([...configuredAlerts, ...mappedAlerts]);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  const getIcon = (type: TriggeredAlert["type"]) => {
    switch (type) {
      case "whale":
        return <Wallet className="h-4 w-4" />;
      case "technical":
        return <Activity className="h-4 w-4" />;
      case "onchain":
        return <AlertTriangle className="h-4 w-4" />;
      case "price":
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: TriggeredAlert["severity"]) => {
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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-6 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alert Configuration */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">My Alerts</CardTitle>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[700px] pr-4">
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border transition-all ${selectedAlert === alert.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{alert.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {alert.condition}
                          </div>
                        </div>
                        <Switch checked={alert.isActive} />
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant="outline"
                          className={
                            alert.type === "whale"
                              ? "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20"
                              : alert.type === "technical"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20"
                          }
                        >
                          {alert.type}
                        </Badge>
                        {alert.token && (
                          <Badge variant="secondary" className="text-xs">
                            {alert.token}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>Triggered: {alert.triggerCount}×</span>
                        {alert.lastTriggered && (
                          <span>{formatDistanceToNow(alert.lastTriggered, { addSuffix: true })}</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1"
                          onClick={() => setSelectedAlert(alert.id)}
                        >
                          <Settings className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Alert Feed & Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Triggered Alerts Feed */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Recent Alerts</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20">
                    {triggeredAlerts.length} Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {triggeredAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className={`p-2 rounded-md ${getSeverityColor(alert.severity)}`}>
                          {getIcon(alert.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <p className="text-sm font-medium leading-tight">{alert.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {alert.alertName}
                              </p>
                            </div>
                            {alert.token && (
                              <Badge variant="secondary" className="shrink-0 text-xs">
                                {alert.token}
                              </Badge>
                            )}
                          </div>

                          <p className="text-xs text-muted-foreground mb-2">{alert.details}</p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                            </span>
                            <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Alert Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Alert Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div className="font-semibold">RSI Alert</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Get notified when RSI enters overbought/oversold zones
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Create Alert
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-[var(--warning)]/10 text-[var(--warning)]">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div className="font-semibold">Price Target</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Alert when token reaches your target price
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Create Alert
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-[var(--danger)]/10 text-[var(--danger)]">
                        <Wallet className="h-4 w-4" />
                      </div>
                      <div className="font-semibold">Whale Movement</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Track large transfers to/from exchanges
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Create Alert
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-[var(--success)]/10 text-[var(--success)]">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="font-semibold">TVL Change</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Monitor significant TVL changes in protocols
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Create Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
