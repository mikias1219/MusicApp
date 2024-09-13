import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setSongs, addSong, updateSong, deleteSong } from '../slices/songSlice';

// Specify the types returned by your generator functions
function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'http://localhost:5000/songs');
    yield put(setSongs(response.data));
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function* addSongSaga(action: ReturnType<typeof addSong>): Generator<any, void, any> {
  try {
    yield call(axios.post, 'http://localhost:5000/createsong', action.payload);
  } catch (error) {
    console.error('Error adding song:', error);
  }
}

function* updateSongSaga(action: ReturnType<typeof updateSong>): Generator<any, void, any> {
  try {
    yield call(axios.put, `http://localhost:5000/songs/${action.payload._id}`, action.payload);
  } catch (error) {
    console.error('Error updating song:', error);
  }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSong>): Generator<any, void, any> {
  try {
    yield call(axios.delete, `http://localhost:5000/songs/${action.payload}`);
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
