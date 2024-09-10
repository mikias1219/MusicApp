import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optional: use this if you want to add custom styles
import { Link } from 'react-router-dom';

interface SongType {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

const Song: React.FC = () => {
    const navigate = useNavigate();
    const [songs, setSongs] = useState<SongType[]>([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get<SongType[]>('http://localhost:5000/songs');
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const handleEditClick = (id: string) => {
        navigate(`/update/${id}`);
    };

    const handleDeleteClick = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/songs/${id}`);
            setSongs(songs.filter(song => song._id !== id));
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleAddClick = () => {
        navigate('/create');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Song List</h2>
                <button className="btn btn-success btn-lg" onClick={handleAddClick}>
                    + Add Song
                </button>
                <Link to="/statistics" className="btn btn-info mb-3">View Statistics</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Genre</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                            <tr key={song._id} className="align-middle">
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.album}</td>
                                <td>{song.genre}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEditClick(song._id)}
                                    >
                                        <i className="bi bi-pencil-square"></i> Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteClick(song._id)}
                                    >
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Song;
