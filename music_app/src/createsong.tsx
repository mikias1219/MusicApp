import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// Define the type for a song
interface SongType {
    title: string;
    artist: string;
    album: string;
    genre: string;
}

const CreateSong: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [artist, setArtist] = useState<string>('');
    const [album, setAlbum] = useState<string>('');
    const [genre, setGenre] = useState<string>('Pop');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newSong: SongType = { title, artist, album, genre };

        try {
            // Post the new song to the server
            const response = await axios.post('http://localhost:5000/createsong', newSong);
            console.log('Song created successfully:', response.data);

            // Redirect to the homepage or songs list
            navigate('/');
        } catch (error) {
            console.error('There was an error creating the song:', error);
        }
    };
     const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Create Song</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="artist" className="form-label">Artist</label>
                        <input
                            type="text"
                            className="form-control"
                            id="artist"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="album" className="form-label">Album</label>
                        <input
                            type="text"
                            className="form-control"
                            id="album"
                            value={album}
                            onChange={(e) => setAlbum(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <select
                            className="form-select"
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option value="Pop">Pop</option>
                            <option value="Rock">Rock</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Classical">Classical</option>
                            <option value="Hip-Hop">Hip-Hop</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Song</button>
                    <button type="button" className="btn btn-secondary mt-3 ml-3" onClick={handleBackToHome}>Back to Home</button>
                </form>
            </div>
        </div>
    );
};

export default CreateSong;
