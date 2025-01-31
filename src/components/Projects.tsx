import { Tabs } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import Cards from "./Cards";
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}


const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    fetch(`../../data.json`)
      .then((response) => response.json())
      .then((data) => setProjects(data.projects));
  }, []);
  useEffect(()=>{
     const uniqueCategories = Array.from(
       new Set(projects.map((project) => project.category))
     );
     setCategories(uniqueCategories);
  },[projects])
  return (
    <div className="p-5">
      <h1 className="telekom-title">Projects</h1>
      <h2 className="text-2xl font-bold">A list of ongoing and future projects</h2>
      <Tabs aria-label="Tabs with underline" variant="underline">
        {categories &&
          categories.map((category) => (
            <Tabs.Item title={category}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projects
                  .filter((project) => project.category === category)
                  .map((project) => (
                    <Cards
                      key={project.id}
                      route={`/project/${project.id}`}
                      img={project.image}
                      title={project.title}
                      description={project.description}
                    />
                  ))}
              </div>
            </Tabs.Item>
          ))}
      </Tabs>
    </div>
  );
};

export default Projects;
