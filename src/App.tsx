import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  return <>
  <Router>
    <nav className="flex justify-evenly">
      <Link to='/'>Home</Link>
      <Link to='/profile'>Profile</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </Router>

  </>;
}

export default App;
