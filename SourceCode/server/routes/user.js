import express from "express";
const router = express.Router();

import { register, login, deleteUser } from "../controllers/user.js";

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);

export default router;