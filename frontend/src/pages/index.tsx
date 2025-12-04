import Link from "next/link";
import { Button } from "@/components/ui/button";
import FloatingOrbs from "@/components/ui/floating-orbs";

export default function Index() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs />
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold mb-4">
              Welcome to <span className="text-primary">EONCOIN</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of digital finance with our cutting-edge platform
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-8 shadow-lg shadow-primary/30"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 font-medium rounded-full px-8"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
