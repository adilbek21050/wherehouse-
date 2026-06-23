
import './App.css';
import Header from './components/Headers/Header';
import Tests from './components/products/Product';
import WereHouse from './components/whereHouse/WereHouse';
import Admin from './components/admin/Admin';
import { Routes, Route } from 'react-router-dom';
import Main from './components/tables/Tables';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<WereHouse />} />
        <Route path="/main" element={<Main  />} />
        <Route path="/products" element={<Tests />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}



export default App;
