import express from 'express';
import mongoose from 'mongoose';

import Artworks from '../models/artworks.js'

const router = express.Router();

const secret = 'test'; 

export const getArtwork = async (req, res) => {
    
    // const { page } = req.query;
    // console.log("我在这儿计算页码"+page);
    try {
        const artworks=await Artworks.find();
        res.status(200).json(artworks);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const addArtwork = async(req, res) => {
    
    const post = req.body;

    const newPostMessage = new Artworks({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteArtwork = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No artwork with id: ${id}`);

    await Artworks.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const updateArtwork = async (req, res) => {
    const { id } = req.params;
    const { title, description, name, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No artwork with id: ${id}`);

    const updatedPost = { name, title, description, tags, selectedFile, _id: id };

    await Artworks.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}