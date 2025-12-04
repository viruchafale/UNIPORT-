"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface MiniChartProps {
  title: string;
  symbol: string;
  price: string;
  change: number;
  data: Array<{ time: string; price: number }>;
}

export function MiniChart({ title, symbol, price, change, data }: MiniChartProps) {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            <div className="text-xs text-muted-foreground mt-1">{symbol}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{price}</div>
            <div className={`text-xs font-medium ${isPositive ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
              {isPositive ? "+" : ""}{change}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "var(--success)" : "var(--danger)"}
              strokeWidth={2}
              dot={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
