import logo from './logo.svg';
import './App.css';
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Inventory from './views/Inventory';
import Profile from './views/Profile';
import PostSingle from "./views/PostSingle";
import { AuthContext } from "./contexts/AuthProvider";

function App() {
  const { login, user, logout } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <div>
        { user.loggedIn ? ( 
        <>
        <button onClick={logout}>Logout</button>
        <p>Current User: {user.displayName} </p>
        </>
        ) : (
        <button onClick={login}>Login</button>
        )} 
      </div>
      <Routes>
        <Route path="/post/:id" element={<PostSingle />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
