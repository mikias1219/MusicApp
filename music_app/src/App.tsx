import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Song from './song';
import CreateSong from './createsong';
import UpdateSong from './updatesong';
import Statistics from './Statistics';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Song />} />
          <Route path='/create' element={<CreateSong />} />
          <Route path='/update/:id' element={<UpdateSong />} />
          <Route path='/statistics' element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
