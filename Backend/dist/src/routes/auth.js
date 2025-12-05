import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController.js";
// import authMiddleware from "../middlewares/authMiddleware.js";
router.post("/register", authController.register);
router.post("/login", authController.login);
// router.get("/profile", authMiddleware, authController.profile)
export default router;
//# sourceMappingURL=auth.js.map