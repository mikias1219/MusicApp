import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from './store';
import { updateSong } from './slices/songSlice';
import styled from '@emotion/styled';

const FormContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
`;

const FormTitle = styled.h2`
  color: #007bff;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:first-of-type {
    background-color: #007bff;
    color: white;
    margin-right: 10px;
  }

  &:last-of-type {
    background-color: #6c757d;
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const UpdateSong: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const song = useSelector((state: RootState) =>
    state.songs.songs.find(song => song._id === id)
  );

  const [title, setTitle] = useState(song?.title || '');
  const [artist, setArtist] = useState(song?.artist || '');
  const [album, setAlbum] = useState(song?.album || '');
  const [genre, setGenre] = useState(song?.genre || '');

  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setArtist(song.artist);
      setAlbum(song.album);
      setGenre(song.genre);
    }
  }, [song]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateSong({ _id: id!, title, artist, album, genre }));
    navigate('/');
  };

  return (
    <FormContainer>
      <FormTitle>Update Song</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="title">Title</FormLabel>
          <FormInput
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="artist">Artist</FormLabel>
          <FormInput
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="album">Album</FormLabel>
          <FormInput
            type="text"
            id="album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="genre">Genre</FormLabel>
          <FormSelect
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Jazz">Jazz</option>
            <option value="Classical">Classical</option>
            <option value="Hip-Hop">Hip-Hop</option>
          </FormSelect>
        </FormGroup>
        <Button type="submit">Update Song</Button>
        <Button type="button" onClick={() => navigate('/')}>Back to Home</Button>
      </form>
    </FormContainer>
  );
};

export default UpdateSong;
