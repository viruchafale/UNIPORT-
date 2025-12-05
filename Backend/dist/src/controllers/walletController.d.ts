import type { Request, Response } from 'express';
export declare const createWallet: (req: Request, res: Response) => Promise<void>;
export declare const getWallets: (req: Request, res: Response) => Promise<void>;
export declare const updateWallet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteWallet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=walletController.d.ts.map