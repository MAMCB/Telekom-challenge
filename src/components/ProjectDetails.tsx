import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

interface Project {

    id: number;
    title: string;
    description: string;
    image: string;
}

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState<Project|null>(null)
    useEffect(() => {
        fetch(`../../data.json`)
        .then((response) => response.json())
        .then((data) => setProject(data.projects.find((project:Project) => project.id === parseInt(id? id : ""))))
    }, [id])
  return (
    <>
      {project && (
        <div>
          <h1>{project.title}</h1>
          <div>
            <img src={project.image} alt={project.title} />
            <p>{project.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDetails