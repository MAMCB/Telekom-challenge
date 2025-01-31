import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Events from "./components/Events";
import ProjectDetails from "./components/ProjectDetails";
import News from "./components/News";
import telekomLogo from "./assets/telekom-logo.svg";
import ProfileModal from "./components/ProfileModal";
import EventDetails from "./components/EventDetails";
import { useState } from "react";
import "./App.css";

function App() {
   const [isHovered, setIsHovered] = useState(false);

   // Handle mouse enter and leave events
   const handleMouseClick = () => setIsHovered(true);
   const handleMouseLeave = () => setIsHovered(false);
  return (
    <>
      <Router>
        <nav className="flex justify-between m-5 nav">
          <Link to="/">
            <img src={telekomLogo} alt="Telekom Logo" width="50" height="50" />
          </Link>
          <Link to="/news">News</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/events">Events</Link>

          <svg
            onClick={handleMouseClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-9"
            id="profileLogo"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </nav>
        <div onMouseLeave={handleMouseLeave}>
          <ProfileModal visible={isHovered} signedUp={true} userId={1} />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/news" element={<News />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </Router>
      <a href="https://www.flaticon.com/free-icons/user" title="user icons">
        User icons created by Freepik - Flaticon
      </a>
    </>
  );
}

export default App;
