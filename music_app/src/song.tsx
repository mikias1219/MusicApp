import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from './store';
import { deleteSong, fetchSongs } from './slices/songSlice';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2, FiBarChart2, FiPlay } from 'react-icons/fi';
import axios from 'axios';

// Import the styled components
import { PageContainer, VideoSection, SongListContainer, FilterContainer } from './StyledComponents'; 

const Song: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const fetchYouTubeVideo = async (title: string) => {
    try {
      const apiKey = 'AIzaSyDCYnkcE0CGct1QczXxgcgCB7qMrD-Y3gQ';
      const query = `${title}`;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&key=${apiKey}`
      );

      if (response.data.items.length > 0) {
        const videoId = response.data.items[0]?.id?.videoId;
        if (videoId) {
          setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
        }
      }
    } catch (error) {
      console.error('Error fetching YouTube video', error);
    }
  };

  const handleAddClick = () => {
    navigate('/create');
  };

  const handleEditClick = (id: string) => {
    navigate(`/update/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteSong(id));
  };

  const handlePlayClick = (title: string) => {
    fetchYouTubeVideo(title);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const filteredSongs = selectedGenre
    ? songs.filter((song) => song.genre === selectedGenre)
    : songs;

  return (
    <PageContainer>
      {/* Video Section (Music displayed above the song list) */}
      <VideoSection>
        {videoUrl && (
          <div className="video-player">
            <iframe
              title="YouTube Video Player"
              src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </VideoSection>

      {/* Song List */}
      <SongListContainer>
        <div className="header">
          <h2 className="text-primary">Song List</h2>
          <button className="add-button" onClick={handleAddClick}>
            <FiPlus className="icon" />
            Add Song
          </button>
        </div>

        {/* Filter by Genre */}
        <FilterContainer>
          <label htmlFor="genre-select">Filter by Genre:</label>
          <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {[...new Set(songs.map((song) => song.genre))].map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </FilterContainer>

        <Link to="/statistics" className="link">
          <FiBarChart2 className="icon" />
          View Statistics
        </Link>

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
            {filteredSongs.map((song) => (
              <tr key={song._id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td className="actions">
                  <button className="edit-button" onClick={() => handleEditClick(song._id)}>
                    <FiEdit className="icon" />
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteClick(song._id)}>
                    <FiTrash2 className="icon" />
                    Delete
                  </button>
                  <button className="play-button" onClick={() => handlePlayClick(song.title)}>
                    <FiPlay className="icon" />
                    Play
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SongListContainer>
    </PageContainer>
  );
};

export default Song;
