import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Wallet as WalletIcon, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { api, API_URL } from "@/services/api";
import { toast } from "sonner";

interface Wallet {
  _id: string;
  address: string;
  label: string;
  chain: string;
  userId: string;
  createdAt: string;
}

export default function WalletsPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [formData, setFormData] = useState({
    address: "",
    label: "",
    chain: "Ethereum",
  });

  // Search, Filter, Sort, Pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterChain, setFilterChain] = useState("all");
  const [sortBy, setSortBy] = useState<"label" | "chain" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const userId = "507f1f77bcf86cd799439011";

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const data = await api.getWallets(userId);
      setWallets(data);
    } catch (error) {
      console.error("Error fetching wallets:", error);
      toast.error("Failed to load wallets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  // Filtered and sorted wallets
  const processedWallets = useMemo(() => {
    let filtered = wallets.filter((wallet) => {
      const matchesSearch =
        wallet.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChain = filterChain === "all" || wallet.chain === filterChain;
      return matchesSearch && matchesChain;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "label") {
        comparison = a.label.localeCompare(b.label);
      } else if (sortBy === "chain") {
        comparison = a.chain.localeCompare(b.chain);
      } else {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [wallets, searchTerm, filterChain, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(processedWallets.length / itemsPerPage);
  const paginatedWallets = processedWallets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createWallet({ ...formData, userId });
      toast.success("Wallet created successfully!");
      setIsCreateOpen(false);
      setFormData({ address: "", label: "", chain: "Ethereum" });
      fetchWallets();
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast.error("Failed to create wallet");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWallet) return;

    try {
      await fetch(`${API_URL}/wallets/${selectedWallet._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.success("Wallet updated successfully!");
      setIsEditOpen(false);
      setSelectedWallet(null);
      setFormData({ address: "", label: "", chain: "Ethereum" });
      fetchWallets();
    } catch (error) {
      console.error("Error updating wallet:", error);
      toast.error("Failed to update wallet");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wallet?")) return;

    try {
      await fetch(`${API_URL}/wallets/${id}`, {
        method: "DELETE",
      });
      toast.success("Wallet deleted successfully!");
      fetchWallets();
    } catch (error) {
      console.error("Error deleting wallet:", error);
      toast.error("Failed to delete wallet");
    }
  };

  const openEditDialog = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setFormData({
      address: wallet.address,
      label: wallet.label,
      chain: wallet.chain,
    });
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-6 max-w-[1920px] mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Wallet Management</h1>
            <p className="text-muted-foreground">
              Manage your cryptocurrency wallets with full CRUD operations
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Wallet</DialogTitle>
                <DialogDescription>Add a new wallet address to track</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Wallet Address</Label>
                    <Input
                      id="address"
                      placeholder="0x..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="label">Label</Label>
                    <Input
                      id="label"
                      placeholder="My Main Wallet"
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chain">Chain</Label>
                    <Select value={formData.chain} onValueChange={(value) => setFormData({ ...formData, chain: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ethereum">Ethereum</SelectItem>
                        <SelectItem value="Polygon">Polygon</SelectItem>
                        <SelectItem value="Solana">Solana</SelectItem>
                        <SelectItem value="Avalanche">Avalanche</SelectItem>
                        <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Wallet</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search, Filter, Sort Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by label or address..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={filterChain} onValueChange={(value) => { setFilterChain(value); setCurrentPage(1); }}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Chains</SelectItem>
                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                    <SelectItem value="Polygon">Polygon</SelectItem>
                    <SelectItem value="Solana">Solana</SelectItem>
                    <SelectItem value="Avalanche">Avalanche</SelectItem>
                    <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                  const [newSortBy, newSortOrder] = value.split("-") as [typeof sortBy, typeof sortOrder];
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="label-asc">Label A-Z</SelectItem>
                    <SelectItem value="label-desc">Label Z-A</SelectItem>
                    <SelectItem value="chain-asc">Chain A-Z</SelectItem>
                    <SelectItem value="chain-desc">Chain Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallets List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WalletIcon className="h-5 w-5" />
              Your Wallets
              <Badge variant="secondary" className="ml-2">
                {processedWallets.length} {processedWallets.length === 1 ? "Result" : "Results"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading wallets...</div>
            ) : paginatedWallets.length === 0 ? (
              <div className="text-center py-8">
                <WalletIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterChain !== "all" ? "No wallets match your filters." : "No wallets found. Create your first wallet to get started."}
                </p>
                {!searchTerm && filterChain === "all" && (
                  <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Wallet
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Label</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Address</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Chain</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedWallets.map((wallet) => (
                        <tr key={wallet._id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-4 font-semibold">{wallet.label}</td>
                          <td className="py-4 px-4 font-mono text-sm">
                            {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary">{wallet.chain}</Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">
                            {new Date(wallet.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm" onClick={() => openEditDialog(wallet)}>
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete(wallet._id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedWallets.length)} of {processedWallets.length} results
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Edit Wallet Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Wallet</DialogTitle>
              <DialogDescription>Update wallet information</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdate}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Wallet Address</Label>
                  <Input
                    id="edit-address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-label">Label</Label>
                  <Input
                    id="edit-label"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-chain">Chain</Label>
                  <Select value={formData.chain} onValueChange={(value) => setFormData({ ...formData, chain: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ethereum">Ethereum</SelectItem>
                      <SelectItem value="Polygon">Polygon</SelectItem>
                      <SelectItem value="Solana">Solana</SelectItem>
                      <SelectItem value="Avalanche">Avalanche</SelectItem>
                      <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Wallet</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
