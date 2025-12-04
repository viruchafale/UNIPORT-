"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
}

export function KPICard({ title, value, change, changeLabel, icon, trend }: KPICardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "text-[var(--success)]";
    if (trend === "down") return "text-[var(--danger)]";
    return "text-muted-foreground";
  };

  const getTrendBgColor = () => {
    if (trend === "up") return "bg-[var(--success)]/10";
    if (trend === "down") return "bg-[var(--danger)]/10";
    return "bg-muted/50";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <div className={`p-2 rounded-lg ${getTrendBgColor()}`}>
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{value}</div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
              {trend === "up" && <TrendingUp className="h-4 w-4" />}
              {trend === "down" && <TrendingDown className="h-4 w-4" />}
              <span>{change > 0 ? "+" : ""}{change}%</span>
              {changeLabel && (
                <span className="text-muted-foreground ml-1">({changeLabel})</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
