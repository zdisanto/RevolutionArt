import express from "express";
const router = express.Router();

import { register, login, deleteUser, updateUserInfo, resetPwd, getInfo } from "../controllers/user.js";

router.patch("/resetPwd", resetPwd);
router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUserInfo);
router.get("/:id", getInfo);

export default router;