import express from "express";
import { paynow } from "../controller/payments.js";
import { getAllPayments } from "../controller/admin/payments.controller.js"

import { isAdmin, protect,studentOnly } from "../AuthMiddleware.js";
const router = express.Router();

router.post("/",protect,studentOnly,paynow);
router.get("/allpayments",isAdmin, protect, getAllPayments);

export default router;
