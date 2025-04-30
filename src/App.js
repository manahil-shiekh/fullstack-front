import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Homes from './pages/Homes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUsers from './users/AddUsers';
import EditUsers from './users/EditUsers';
import ViewUser from './users/ViewUser';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>

     <Routes>
      <Route exact path="/" element={<Homes/>}/>
      <Route exact path="/adduser" element={<AddUsers/>}/>
      <Route exact path="/edituser/:id" element={<EditUsers/>}/>
      <Route exact path="/viewuser/:id" element={<ViewUser/>}/>
      
      </Routes>
      
      </Router>
    

    </div>
  );
}

export default App;
