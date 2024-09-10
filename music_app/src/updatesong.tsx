import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests

// Define the type for a song
interface SongType {
    _id?: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

const UpdateSong: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [artist, setArtist] = useState<string>('');
    const [album, setAlbum] = useState<string>('');
    const [genre, setGenre] = useState<string>('Pop'); // Default value
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            // Fetch the song details based on ID from the backend API
            axios.get<SongType>(`http://localhost:5000/songs/${id}`)
                .then(response => {
                    const fetchedSong = response.data;
                    setTitle(fetchedSong.title);
                    setArtist(fetchedSong.artist);
                    setAlbum(fetchedSong.album);
                    setGenre(fetchedSong.genre);
                })
                .catch(error => {
                    console.error("There was an error fetching the song!", error);
                });
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedSong: SongType = { title, artist, album, genre };

        // Make a PUT request to update the song in the backend
        axios.put(`http://localhost:5000/songs/${id}`, updatedSong)
            .then(() => {
                // Redirect to the main page after the update
                navigate('/');
            })
            .catch(error => {
                console.error("There was an error updating the song!", error);
            });
    };
const handleBackToHome = () => {
        navigate('/');
    };
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Update Song</h2>
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
                    <button type="submit" className="btn btn-primary">Update Song</button>
                    <button type="button" className="btn btn-secondary mt-3 ml-3" onClick={handleBackToHome}>Back to Home</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateSong;
