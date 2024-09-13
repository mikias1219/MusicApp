import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import songReducer from './slices/songSlice';
import { songSaga } from './saga/songSaga';

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine all sagas
function* rootSaga() {
  yield all([songSaga()]);
}

// Configure the store with the reducer and middleware
const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
