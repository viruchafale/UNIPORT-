import type { Request, Response, NextFunction } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export default authMiddleware;
//# sourceMappingURL=authMiddleware.d.ts.map