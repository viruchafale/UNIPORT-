"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Bell, Settings, Moon, Sun, LogOut, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";

export function Header() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isConnected, setIsConnected] = useState(true); // Simplified for now

  const handleSignOut = async () => {
    // Simplified sign out
    setIsConnected(false);
    router.push("/login");
    toast.success("Signed out successfully");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">U</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">UNIPORT</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/wallets" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Wallets
            </Link>
            <Link href="/transactions" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Transactions
            </Link>
            <Link href="/explorer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Explorer
            </Link>
            <Link href="/charts" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Charts
            </Link>
            <Link href="/portfolio" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link href="/analytics" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Analytics
            </Link>
            <Link href="/alerts" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Alerts
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isConnected && (
            <>
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border">
                <User className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-medium">viraj chafle</span>
              </div>

              <select className="hidden sm:block h-9 px-3 py-1 text-xs rounded-md border bg-background">
                <option>All Chains</option>
                <option>Ethereum</option>
                <option>Polygon</option>
                <option>Solana</option>
                <option>Avalanche</option>
              </select>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isConnected && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--danger)]" />
              </Button>

              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>

              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}