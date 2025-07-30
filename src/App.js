import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import AnimePage from './components/AnimePage';
import CharsPage from './components/CharsPage';
import GamePage from './components/GamePage';
import MiscPage from './components/MiscPage';
import MusicPage from './components/MusicPage';
import SocialPage from './components/SocialPage';

function App() {
  return (
    <div className="App">
      <audio id="promiseBGM" src="/music/promise.wav" />
      <Router>
        <Routes>
          <Route path = "/" element={<Homepage />} />
          <Route path = "/anime" element={<AnimePage/>} />
          <Route path = "/games" element={<GamePage/>} />
          <Route path = "/chars" element={<CharsPage/>} />
          <Route path = "/music" element={<MusicPage/>} />
          <Route path = "/misc" element={<MiscPage/>} />
          <Route path = "/socials" element={<SocialPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
