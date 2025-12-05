import { verifyToken } from '../services/jwtService.js';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).json({ message: "token not provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Malformed token" });
        return;
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
};
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map