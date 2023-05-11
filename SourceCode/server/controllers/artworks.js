import express from 'express';
import mongoose from 'mongoose';

import Artworks from '../models/artworks.js'

const router = express.Router();

const secret = 'test'; 

export const getArtwork = async (req, res) => {
    const {id}=req.params;
    try {
        const artworks=await Artworks.find({creator:id});
        res.status(200).json(artworks);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getAllArtwork = async (req, res) => {
    try {
        const artworks=await Artworks.find();
        res.status(200).json(artworks);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const addArtwork = async(req, res) => {
    
    const post = req.body;

    const newPostMessage = new Artworks({ ...post, createdAt: new Date().toISOString() })

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

export const likePost = async (req, res) => {
    const { id } = req.params;//post_id

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Artworks.findById(id);//find the post that was liked by someone

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    
    const updatedPost = await Artworks.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}