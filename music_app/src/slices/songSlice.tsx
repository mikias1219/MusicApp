import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface NewSongType {
  title: string;
  artist: string;
  album: string;
  genre: string;
}
interface SongType {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface StatisticsType {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: { _id: string; count: number }[];
  songsAndAlbumsPerArtist: { artist: string; songCount: number; albumCount: number }[];
  songsPerAlbum: { _id: string; count: number }[];
}

interface SongState {
  songs: SongType[];
  statistics: StatisticsType | null;
}

const initialState: SongState = {
  songs: [],
  statistics: null,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongs: (state) => state,
    setSongs: (state, action: PayloadAction<SongType[]>) => {
      state.songs = action.payload;
    },
     addSongRequest: (state, _action: PayloadAction<NewSongType>) => state,
    addSongSuccess: (state, action: PayloadAction<SongType>) => {
      state.songs.push(action.payload);
    },
    updateSongRequest: (state, _action: PayloadAction<SongType>) => state,
    updateSongSuccess: (state, action: PayloadAction<SongType>) => {
      const index = state.songs.findIndex(song => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    deleteSongRequest: (state, _action: PayloadAction<string>) => state,
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song._id !== action.payload);
    },
    fetchStatistics: (state) => state,
    setStatistics: (state, action: PayloadAction<StatisticsType>) => {
      state.statistics = action.payload;
    },
  },
});

export const {
  fetchSongs,
  setSongs,
  addSongRequest,
  addSongSuccess,
  updateSongRequest,
  updateSongSuccess,
  deleteSongRequest,
  deleteSongSuccess,
  fetchStatistics,
  setStatistics,
} = songSlice.actions;

export default songSlice.reducer;
