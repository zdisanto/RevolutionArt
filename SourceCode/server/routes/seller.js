import express from "express";
const router = express.Router();

import { s_register, s_login } from "../controllers/seller.js";

router.post("/s_register", s_register);
router.post("/s_login", s_login);

export default router;