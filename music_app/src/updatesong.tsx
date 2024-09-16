import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from './store';
import { updateSong } from './slices/songSlice';
import {
  FormContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  Button,
} from './StyledComponents'; // Import the styles

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
