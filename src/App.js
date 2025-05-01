import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Homes from './pages/Homes';
import LoginForm from './pages/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUsers from './users/AddUsers';
import EditUsers from './users/EditUsers';
import ResetPassword from './pages/ResetPassword'; 
import ViewUser from './users/ViewUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<><Navbar /><Homes /></>} />
          <Route path="/adduser" element={<><Navbar /><AddUsers /></>} />
          <Route path="/edituser/:id" element={<><Navbar /><EditUsers /></>} />
          <Route path="/viewuser/:id" element={<><Navbar /><ViewUser /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
