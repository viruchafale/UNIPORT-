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
import { Plus, Pencil, Trash2, ArrowRightLeft, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";

interface Transaction {
  _id: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  chain: string;
  userId: string;
  createdAt: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    hash: "",
    from: "",
    to: "",
    value: "",
    chain: "Ethereum",
  });

  // Search, Filter, Sort, Pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterChain, setFilterChain] = useState("all");
  const [sortBy, setSortBy] = useState<"value" | "chain" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const userId = "507f1f77bcf86cd799439011";

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await api.getTransactions(userId);
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filtered and sorted transactions
  const processedTransactions = useMemo(() => {
    let filtered = transactions.filter((tx) => {
      const matchesSearch =
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChain = filterChain === "all" || tx.chain === filterChain;
      return matchesSearch && matchesChain;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "value") {
        comparison = a.value - b.value;
      } else if (sortBy === "chain") {
        comparison = a.chain.localeCompare(b.chain);
      } else {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, searchTerm, filterChain, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(processedTransactions.length / itemsPerPage);
  const paginatedTransactions = processedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createTransaction({
        ...formData,
        value: parseFloat(formData.value),
        userId,
      });
      toast.success("Transaction created successfully!");
      setIsCreateOpen(false);
      setFormData({ hash: "", from: "", to: "", value: "", chain: "Ethereum" });
      fetchTransactions();
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("Failed to create transaction");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransaction) return;

    try {
      await fetch(`http://localhost:5001/api/transactions/${selectedTransaction._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          value: parseFloat(formData.value),
        }),
      });
      toast.success("Transaction updated successfully!");
      setIsEditOpen(false);
      setSelectedTransaction(null);
      setFormData({ hash: "", from: "", to: "", value: "", chain: "Ethereum" });
      fetchTransactions();
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("Failed to update transaction");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await fetch(`http://localhost:5001/api/transactions/${id}`, {
        method: "DELETE",
      });
      toast.success("Transaction deleted successfully!");
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  const openEditDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      hash: transaction.hash,
      from: transaction.from,
      to: transaction.to,
      value: transaction.value.toString(),
      chain: transaction.chain,
    });
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-6 max-w-[1920px] mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Transaction Management</h1>
            <p className="text-muted-foreground">
              Track and manage blockchain transactions with full CRUD operations
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Transaction</DialogTitle>
                <DialogDescription>Add a new transaction record</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="hash">Transaction Hash</Label>
                    <Input
                      id="hash"
                      placeholder="0x..."
                      value={formData.hash}
                      onChange={(e) => setFormData({ ...formData, hash: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from">From Address</Label>
                    <Input
                      id="from"
                      placeholder="0x..."
                      value={formData.from}
                      onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">To Address</Label>
                    <Input
                      id="to"
                      placeholder="0x..."
                      value={formData.to}
                      onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      type="number"
                      step="0.000001"
                      placeholder="1.5"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
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
                  <Button type="submit">Create Transaction</Button>
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
                    placeholder="Search by hash, from, or to address..."
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
                    <SelectItem value="value-desc">Highest Value</SelectItem>
                    <SelectItem value="value-asc">Lowest Value</SelectItem>
                    <SelectItem value="chain-asc">Chain A-Z</SelectItem>
                    <SelectItem value="chain-desc">Chain Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5" />
              Your Transactions
              <Badge variant="secondary" className="ml-2">
                {processedTransactions.length} {processedTransactions.length === 1 ? "Result" : "Results"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading transactions...</div>
            ) : paginatedTransactions.length === 0 ? (
              <div className="text-center py-8">
                <ArrowRightLeft className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterChain !== "all" ? "No transactions match your filters." : "No transactions found. Create your first transaction to get started."}
                </p>
                {!searchTerm && filterChain === "all" && (
                  <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Transaction
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Hash</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">From</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">To</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Chain</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTransactions.map((tx) => (
                        <tr key={tx._id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-4 font-mono text-sm">
                            {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                          </td>
                          <td className="py-4 px-4 font-mono text-sm">
                            {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                          </td>
                          <td className="py-4 px-4 font-mono text-sm">
                            {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                          </td>
                          <td className="py-4 px-4 text-right font-semibold">
                            {tx.value.toFixed(6)}
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary">{tx.chain}</Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm" onClick={() => openEditDialog(tx)}>
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete(tx._id)}>
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
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedTransactions.length)} of {processedTransactions.length} results
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

        {/* Edit Transaction Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
              <DialogDescription>Update transaction information</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdate}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-hash">Transaction Hash</Label>
                  <Input
                    id="edit-hash"
                    value={formData.hash}
                    onChange={(e) => setFormData({ ...formData, hash: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-from">From Address</Label>
                  <Input
                    id="edit-from"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-to">To Address</Label>
                  <Input
                    id="edit-to"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-value">Value</Label>
                  <Input
                    id="edit-value"
                    type="number"
                    step="0.000001"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
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
                <Button type="submit">Update Transaction</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
