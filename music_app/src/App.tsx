import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import './App.css';
import Song from './song';
import CreateSong from './createsong';
import UpdateSong from './updatesong';
import Statistics from './Statistics'

function App() {
  const [songs, setSongs] = useState([
    { id: 1, title: "Song Title", artist: "Mikias", album: "Album Name", genre: "Pop" }
  ]);

  const handleNewSong = (newSong: { id: number; title: string; artist: string; album: string; genre: string; }) => {
    setSongs((prevSongs) => [...prevSongs, newSong]);
  };

  const handleUpdateSong = (updatedSong: { id: number; }) => {
    setSongs((prevSongs) => 
       prevSongs.map(song => song.id === updatedSong.id ? updatedSong : song)
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Song songs={songs} onAdd={handleNewSong} />} />
        <Route path='/create' element={<CreateSong onAdd={handleNewSong} />} />
        <Route path='/update/:id' element={<UpdateSong onUpdate={handleUpdateSong} />} />
         <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
