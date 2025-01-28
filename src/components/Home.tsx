import { Carousel } from "flowbite-react";
import Cards from "./Cards";
import campusImage from "../images/campus.jpg";
import techOfficeImage from "../images/tech office.jpg";
import techPresentationImage from "../images/tech presentation.jpg";
import ProjectGrid from "./ProjectGrid";
import Calendar from "./Calendar";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl mx-5 my-9 telekom-title">
        Welcome to Telekom's student platform
      </h1>

      <Carousel>
        <Cards route="/news" img={techOfficeImage} title="News from Telekom" description="Explore the latest news within Telekom" />
        <Cards route="/projects" img={techPresentationImage} title="Projects" description="Explore the latest projects within Telekom" />
        <Cards route="/events" img={campusImage} title="Events" description="Explore the latest events within Telekom" />
      </Carousel>
      <div>
        <Calendar />
        <ProjectGrid />
      </div>
    </div>
  );
};

export default Home;
