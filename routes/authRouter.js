import { Router } from "express";
const router = Router();
import { login, register, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 1,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes" },
});

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
