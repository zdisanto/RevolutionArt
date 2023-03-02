import express from "express";
const router = express.Router();

import { register, login, deleteUser, updateUserInfo } from "../controllers/user.js";

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUserInfo);

export default router;