import mongoose from 'mongoose';

const artworkSchema = mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    // likes: {
    //     type: [String],
    //     default: [],
    // },
    // comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Artworks = mongoose.model('Artwork', artworkSchema);

export default Artworks;