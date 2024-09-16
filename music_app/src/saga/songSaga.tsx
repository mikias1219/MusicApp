import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setSongs, addSong, updateSong, deleteSong } from '../slices/songSlice';

// Specify the types returned by your generator functions
function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'https://musicapp-3.onrender.com/songs');
    yield put(setSongs(response.data));
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function* addSongSaga(action: ReturnType<typeof addSong>): Generator<any, void, any> {
  try {
    yield call(axios.post, 'https://musicapp-3.onrender.com/createsong', action.payload);
  } catch (error) {
    console.error('Error adding song:', error);
  }
}

function* updateSongSaga(action: ReturnType<typeof updateSong>): Generator<any, void, any> {
  try {
    yield call(axios.put, `https://musicapp-3.onrender.com/songs/${action.payload._id}`, action.payload);
  } catch (error) {
    console.error('Error updating song:', error);
  }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSong>): Generator<any, void, any> {
  try {
    yield call(axios.delete, `https://musicapp-3.onrender.com/songs/${action.payload}`);
  } catch (error) {
    console.error('Error deleting song:', error);
  }
}

export function* songSaga(): Generator<any, void, any> {
  yield takeLatest('songs/fetchSongs', fetchSongsSaga);
  yield takeLatest('songs/addSong', addSongSaga);
  yield takeLatest('songs/updateSong', updateSongSaga);
  yield takeLatest('songs/deleteSong', deleteSongSaga);
}
