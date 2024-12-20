import logo from './logo.svg';
import './App.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddAnimal from './animals/AddAnimal';
import EditAnimal from './animals/EditAnimal';
import ViewAnimal from './animals/ViewAnimal';

function App() {
  return (
    <div className='App'>
      <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/addanimal" element={<AddAnimal/>}/>
            <Route exact path="/editanimal/:id" element={<EditAnimal/>}/>
            <Route exat path="/viewanimal/:id" element={<ViewAnimal/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
