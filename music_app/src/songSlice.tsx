import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SongType {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

interface SongState {
    songs: SongType[];
}

const initialState: SongState = {
    songs: [],
};

const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSongs(state, action: PayloadAction<SongType[]>) {
            state.songs = action.payload;
        },
        addSong(state, action: PayloadAction<SongType>) {
            state.songs.push(action.payload);
        },
        updateSong(state, action: PayloadAction<SongType>) {
            const index = state.songs.findIndex(song => song._id === action.payload._id);
            if (index >= 0) {
                state.songs[index] = action.payload;
            }
        },
        deleteSong(state, action: PayloadAction<string>) {
            state.songs = state.songs.filter(song => song._id !== action.payload);
        },
    },
});

export const { setSongs, addSong, updateSong, deleteSong } = songSlice.actions;
export default songSlice.reducer;
