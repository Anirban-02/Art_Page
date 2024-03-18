import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Gallery from './Components/Gallery';
import Gallerynew from './Components/Gallerynew';
import {BrowserRouter ,Route,Routes} from 'react-router-dom';
import Buy from './Components/Buy';
import { AppProvider } from './context/productcontext';


function App() {
  return (
    <>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/gallery" element={<Gallerynew/>}></Route>
          <Route exact path="/buy" element={<Buy/>}></Route> 
        </Routes>
      </BrowserRouter>
    </AppProvider>
    </>
  );
}

export default App;
