import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from './store';
import { deleteSong, fetchSongs } from './slices/songSlice'; // Ensure fetchSongs is imported
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

// Styled components
const SongListContainer = styled.div`
  margin-top: 5%;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: white;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  button {
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .add-button {
    background-color: #28a745;
    color: white;
  }

  .edit-button {
    background-color: #ffc107;
    color: black;
  }

  .delete-button {
    background-color: #dc3545;
    color: white;
  }

  button:hover {
    opacity: 0.8;
  }

  .link {
    display: inline-block;
    margin: 20px 0;
    color: #007bff;
    text-decoration: none;
    font-size: 16px;
  }

  .link:hover {
    text-decoration: underline;
  }
`;

const Song: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => {
    // Dispatch fetchSongs to load the list of songs from the backend
    dispatch(fetchSongs());
  }, [dispatch]);

  // Function to handle navigation to the "create song" page
  const handleAddClick = () => {
    navigate('/create');
  };

  // Function to navigate to the edit song page
  const handleEditClick = (id: string) => {
    navigate(`/update/${id}`);
  };

  // Function to handle deleting a song
  const handleDeleteClick = (id: string) => {
    dispatch(deleteSong(id));
  };

  return (
    <SongListContainer>
      <h2 className="text-primary">Song List</h2>
      <button className="add-button" onClick={handleAddClick}>+ Add Song</button>
      <Link to="/statistics" className="link">View Statistics</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <td className="actions">
                <button className="edit-button" onClick={() => handleEditClick(song._id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteClick(song._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SongListContainer>
  );
};

export default Song;
