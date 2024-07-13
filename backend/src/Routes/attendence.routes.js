import { Router } from "express";
import { verifyJWT, adminVerify } from "../middlewares/auth.middleware.js";
import { getAttendenceDate, ReadQrCode } from "../controllers/Attendence.controller.js";


const router=Router();

// router.route("/register").post(registerAdmin)
router.route("/attendIt").get(verifyJWT,getAttendenceDate);
router.route("/readqr").post(verifyJWT,ReadQrCode);

export default router;