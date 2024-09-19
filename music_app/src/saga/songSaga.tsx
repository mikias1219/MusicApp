import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  setSongs,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  fetchSongs,
  addSongRequest,
  updateSongRequest,
  deleteSongRequest,
  setStatistics,
  fetchStatistics
} from '../slices/songSlice';

function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'https://musicapp-3.onrender.com/songs');
    yield put(setSongs(response.data));
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function* addSongSaga(action: ReturnType<typeof addSongRequest>): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, 'https://musicapp-3.onrender.com/createsong', action.payload);
    yield put(addSongSuccess(response.data));
  } catch (error) {
    console.error('Error adding song:', error);
  }
}

function* updateSongSaga(action: ReturnType<typeof updateSongRequest>): Generator<any, void, any> {
  try {
    const response = yield call(axios.put, `https://musicapp-3.onrender.com/songs/${action.payload._id}`, action.payload);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    console.error('Error updating song:', error);
  }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSongRequest>): Generator<any, void, any> {
  try {
    yield call(axios.delete, `https://musicapp-3.onrender.com/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    console.error('Error deleting song:', error);
  }
}

function* fetchStatisticsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'https://musicapp-3.onrender.com/statistics');
    yield put(setStatistics(response.data));
  } catch (error) {
    console.error('Error fetching statistics:', error);
  }
}

export function* songSaga(): Generator<any, void, any> {
  yield takeLatest(fetchSongs.type, fetchSongsSaga);
  yield takeLatest(addSongRequest.type, addSongSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
  yield takeLatest(fetchStatistics.type, fetchStatisticsSaga);
}
