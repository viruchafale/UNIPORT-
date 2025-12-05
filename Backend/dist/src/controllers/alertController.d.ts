import type { Request, Response } from 'express';
export declare const createAlert: (req: Request, res: Response) => Promise<void>;
export declare const getAlerts: (req: Request, res: Response) => Promise<void>;
export declare const updateAlert: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAlert: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=alertController.d.ts.map