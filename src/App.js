import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from "./Components/Navbar";
  import EditUser from "./Components/EditUser/EditUserInformation";
  import Login from "./Components/Login/Login";
import EditUserInformation from "./Components/EditUser/EditUserInformation";

function App() {
  return (
    
       <Router>
            <NavBar />
        <Routes>
            <Route path='/Login' element={<Login />} />
                
                <Route path="/EditUser" element={<EditUserInformation />} />
        
            </Routes>
            </Router>
          
        
  );
}

export default App;
