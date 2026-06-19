
import './App.css';
import Header from './components/Headers/Header';
import Tests from './components/Tests';
import WereHouse from './components/WereHouse';
import { Routes, Route } from 'react-router-dom';
function App() {
  
  
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<WereHouse />} />
          <Route path="/tests" element={<Tests />} />
        </Routes>
    </div>
  );
}

export default App;
