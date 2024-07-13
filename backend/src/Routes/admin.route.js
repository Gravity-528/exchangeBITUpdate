import { Router } from "express";
import { adminVerify } from "../middlewares/auth.middleware.js";
import { LoginAdmin, registerAdmin } from "../controllers/Admin.controller.js";

const router=Router();

router.route("/register").post(registerAdmin)
router.route("/logging").post(LoginAdmin);

export default router;