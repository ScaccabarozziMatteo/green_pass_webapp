import Navbar from "./components/Navbar";
import Checker from "./components/Checker";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import QRgeneratorPage from "./components/QRgeneratorPage";

function App() {
  return (
    <div>
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' index element={<Home/>}/>
                <Route path='/checker' element={<Checker/>}/>
                <Route path='/generator' element={<QRgeneratorPage/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
