import express from 'express';
const router = express.Router();

import { addArtwork, getArtwork, deleteArtwork, updateArtwork } from '../controllers/artworks.js';

import auth from "../middleware/s_auth.js";

router.get("/", getArtwork);
router.post("/", addArtwork);
router.delete("/:id", deleteArtwork);
router.patch('/:id', updateArtwork);

export default router;