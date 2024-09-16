// src/components/CreateSong.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FormContainer, 
  FormTitle, 
  FormGroup, 
  FormLabel, 
  FormInput, 
  FormSelect, 
  Button 
} from './StyledComponents';  // Import from your new file

const CreateSong: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [album, setAlbum] = useState<string>('');
  const [genre, setGenre] = useState<string>('Pop');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSong = { title, artist, album, genre };

    try {
      await axios.post('https://musicapp-3.onrender.com/createsong', newSong);
      navigate('/');  // Redirect to the homepage or songs list
    } catch (error) {
      console.error('There was an error creating the song:', error);
    }
  };

  const handleBackToHome = () => {
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
        <Button type="button" onClick={handleBackToHome}>Back to Home</Button>
      </form>
    </FormContainer>
  );
};

export default CreateSong;
