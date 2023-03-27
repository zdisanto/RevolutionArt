import express from "express";
const router = express.Router();

import { s_register, s_login, deleteSeller, forgotPwd, forgotPwd_getLink, forgotPwd_resetPwd, getInfo, updateUserInfo} from "../controllers/seller.js";

router.post("/s_register", s_register);
router.post("/s_login", s_login);
router.delete("/:id", deleteSeller);
router.post("/forgotPwd", forgotPwd);
router.get("/reset-Pwd/:id/:token", forgotPwd_getLink);
router.post("/reset-Pwd/:id/:token", forgotPwd_resetPwd);
router.get("/:id", getInfo);
router.patch("/:id", updateUserInfo);

export default router;