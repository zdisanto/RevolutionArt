import express from 'express';
const router = express.Router();

import { addArtwork, getArtwork, deleteArtwork, updateArtwork, likePost, getAllArtwork } from '../controllers/artworks.js';

import auth from "../middleware/s_auth.js";

router.get("/:id", getArtwork);
router.post("/", addArtwork);
router.delete("/:id", deleteArtwork);
router.patch('/:id', updateArtwork);
router.patch('/:id/likePost', auth, likePost);
router.get("/", getAllArtwork);

export default router;