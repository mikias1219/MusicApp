import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Song document
interface ISong extends Document {
    title: string;
    artist: string;
    album: string;
    genre: string;
}

// Create a schema for the Song model
const SongSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});

// Create the Song model
const Song = mongoose.model<ISong>('Song', SongSchema);

export default Song;
