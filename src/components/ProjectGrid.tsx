//to do fetch projects from data.json and display them in a grid, get the project ids from the profile with id 1
//use the cards component to display the projects
//get any project id saved in local storage and display it in my projects
import Cards from "./Cards";
import { useState } from "react";
import { useEffect } from "react";
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const ProjectGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
   useEffect(() => {
        const storedProjects = localStorage.getItem("projects");
        const initialProjects: Project[] = storedProjects
          ? JSON.parse(storedProjects)
          : [];
  
        fetch(`../../data.json`)
          .then((response) => response.json())
          .then((data) => {
            const myProjects = data.profiles[0].projects;
            const projectsData = data.projects.filter((project: Project) =>
              myProjects.includes(project.id)
            );
  
            // Merge both event sources
            setProjects([...initialProjects, ...projectsData]);
          });
      }, []);
  return (
    <div className=" ">
      <h1 className="text-2xl font-extrabold mx-auto">My Projects</h1>
      <div className="grid grid-cols-2 gap-4">
        {projects &&
          projects.map((project) => (
            <Cards
              key={project.id}
              route={`/project/${project.id}`}
              img={project.image}
              title={project.title}
              description={project.description}
              miniature={true}
            />
          ))}
      </div>
    </div>
  );
}

export default ProjectGrid