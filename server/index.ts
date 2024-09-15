import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from  'cors';
import dotenv from 'dotenv';
import Song from './model/song'; // Import the Song model

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Use CORS middleware to enable CORS
app.use(cors({
  origin: '*', // or specify allowed origins
}));

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to create a new song
app.post('/createsong', async (req: Request, res: Response) => {
    try {
        const newSong = await Song.create(req.body);
        res.status(201).json(newSong);
    } catch (err: any) {
        console.error('Error creating song:', err); // More detailed logging
        res.status(500).json({ error: 'Failed to create song' }); // Generic error message
    }
});


// GET route to fetch all songs
app.get('/songs', async (req: Request, res: Response) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// GET route to fetch a specific song by ID
app.get('/songs/:id', async (req: Request, res: Response) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(song);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// PUT route to update a specific song by ID
app.put('/songs/:id', async (req: Request, res: Response) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(updatedSong);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE route to delete a specific song by ID
app.delete('/songs/:id', async (req: Request, res: Response) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (!deletedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/statistics', async (req: Request, res: Response) => {
    try {
        // Total number of songs
        const totalSongs = await Song.countDocuments({});

        // Total number of distinct artists
        const totalArtists = await Song.distinct('artist').then(artists => artists.length);

        // Total number of distinct albums
        const totalAlbums = await Song.distinct('album').then(albums => albums.length);

        // Total number of distinct genres
        const totalGenres = await Song.distinct('genre').then(genres => genres.length);

        // Number of songs in each genre
        const songsPerGenre = await Song.aggregate([
            { $group: { _id: "$genre", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }  // Optional: Sort by genre name
        ]);

        // Number of songs and albums for each artist
        const songsAndAlbumsPerArtist = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    songCount: { $sum: 1 },
                    albums: { $addToSet: "$album" }
                }
            },
            {
                $project: {
                    artist: "$_id",
                    songCount: 1,
                    albumCount: { $size: "$albums" }
                }
            },
            { $sort: { artist: 1 } }  // Optional: Sort by artist name
        ]);

        // Number of songs in each album
        const songsPerAlbum = await Song.aggregate([
            { $group: { _id: "$album", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }  // Optional: Sort by album name
        ]);

        // Send the response with the statistics
        res.status(200).json({
            totalSongs,
            totalArtists,
            totalAlbums,
            totalGenres,
            songsPerGenre,
            songsAndAlbumsPerArtist,
            songsPerAlbum,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Basic welcome route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Music App API!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://mikias:miki1219@cluster0.8pmom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
