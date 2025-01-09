import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Events from "./components/Events";
import "./App.css";

function App() {
  return <>
  <Router>
    <nav className="flex justify-evenly">
      <Link to='/'>Home</Link>
      <Link to='/events'>Events</Link>
      <Link to='/projects'>Projects</Link>
      <Link to='/profile'>Profile</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </Router>

  </>;
}

export default App;
