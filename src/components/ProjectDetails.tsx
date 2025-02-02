import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import Details from "./Details"

interface Project {

    id: number;
    title: string;
    description: string;
    image: string;
    category:string
}
//to do add a button to add project to my projects, save in local storage the project id
const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project|null>(null)
    useEffect(() => {
        fetch(`../../data.json`)
        .then((response) => response.json())
        .then((data) => setProject(data.projects.find((project:Project) => project.id === parseInt(id? id : ""))))
    }, [id])
  return (
    <>
      {project && (
       <Details title={project.title} description={project.description} image={project.image} />
      )}
    </>
  );
}

export default ProjectDetails