import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

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
        <div className="p-5">
          <h1 className="telekom-title">{project.title}</h1>
          <div className="flex justify-center align-center p-4">
            <img src={project.image} alt={project.title} className="rounded-lg w-1/2" />
            <p className="self-center m-4 text-xl leading-relaxed">{project.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDetails