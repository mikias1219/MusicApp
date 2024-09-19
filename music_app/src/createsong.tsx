import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSongRequest } from './slices/songSlice';  // Updated action for saga
import {
  FormContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  Button,
} from './StyledComponents';

const CreateSong: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('Pop');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addSongRequest({
      title, artist, album, genre
    }));
    navigate('/');
};

  return (
    <FormContainer>
      <FormTitle>Create Song</FormTitle>
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
        <Button type="submit">Add Song</Button>
        <Button type="button" onClick={() => navigate('/')}>Back to Home</Button>
      </form>
    </FormContainer>
  );
};

export default CreateSong;
