import { Carousel } from "flowbite-react";
import Cards from "./Cards";
import campusImage from "../images/campus.jpg";
import techOfficeImage from "../images/tech office.jpg";
import techPresentationImage from "../images/tech presentation.jpg";
import ProjectGrid from "./ProjectGrid";
import Calendar from "./Calendar";




const Home = () => {
  const today = new Date();

  const currentYear = today.getFullYear(); // e.g., 2024
  const currentMonth = today.getMonth(); // 0 (Jan) to 11 (Dec)
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  

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
      <div className="mx-5 my-5 flex justify-between flex-col lg:flex-row" >
        <Calendar year={currentYear} month={currentMonth} monthName={months[currentMonth]} />
        <ProjectGrid />
      </div>
    </div>
  );
};

export default Home;
