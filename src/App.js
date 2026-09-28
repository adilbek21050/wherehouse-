import './App.css';
import Header from './components/Headers/Header';
import { Routes, Route } from 'react-router-dom';
import Titles from "./components/loves/Titles";


function App() {
  return (
    <div className="App">
      {/*<Header />*/}
      <Routes>
        <Route path="/" element={<Titles />} />
      </Routes>
    </div>
  );
}



export default App;
