export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const api = {
  getWallets: async (userId: string) => {
    const res = await fetch(`${API_URL}/wallets?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch wallets');
    return res.json();
  },

  createWallet: async (data: any) => {
    const res = await fetch(`${API_URL}/wallets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create wallet');
    return res.json();
  },

  getTransactions: async (userId: string) => {
    const res = await fetch(`${API_URL}/transactions?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
  },

  createTransaction: async (data: any) => {
    const res = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create transaction');
    return res.json();
  },

  getAlerts: async (userId: string) => {
    const res = await fetch(`${API_URL}/alerts?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  },

  createAlert: async (data: any) => {
    const res = await fetch(`${API_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create alert');
    return res.json();
  },
};
