import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddAnimal from './animals/AddAnimal';

function App() {
  return (
    <div className='App'>
      <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/addanimal" element={<AddAnimal/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
