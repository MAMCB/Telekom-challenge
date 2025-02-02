import { useState } from "react";
import { useEffect } from "react";
import {Events} from "./Calendar"
import {Project} from "./ProjectGrid"
import {  useNavigate } from "react-router-dom";



interface DetailsProps{
    id:number
    title:string;
    image:string;
    description:string;
    subtitle?:string |null;
    addButton?:boolean;
    addType?:"" | "my events" | "my projects";
}

const Details = ({id,title,image,description, subtitle=null,addButton=false,addType=""}:DetailsProps) => {
    const navigate = useNavigate();
    const [item,setItem] = useState<Events | Project | null>(null);
    const [storedInProfile,setStoredInProfile] = useState<boolean>(false);
    // Fetch the item and determine if it's stored in profile or localStorage
  useEffect(() => {
    fetch(`../../data.json`)
      .then((response) => response.json())
      .then((data) => {
        let foundItem = null;

        if (addType === "my events") {
          foundItem = data.events.find((event: Events) => event.id === id);
          setStoredInProfile(
            data.profiles[0].events.some((eventId: number) => eventId === id) ||
            checkStoredItem(foundItem) === null
          );
        } else if (addType === "my projects") {
          foundItem = data.projects.find((project: Project) => project.id === id);
          setStoredInProfile(
            data.profiles[0].projects.some((projectId: number) => projectId === id) ||
            checkStoredItem(foundItem) === null
          );
        }

        setItem(foundItem); // Set the item if found
      });
  }, [id, addType]);

  // Check if item exists in localStorage
  const checkStoredItem = (item: Events | Project) => {
    const type = addType === "my events" ? "events" : "projects";
    const storedItem = localStorage.getItem(type);
    const storedItemArray: (Events | Project)[] = storedItem ? JSON.parse(storedItem) : [];

    // Check if item already exists
    if (storedItemArray.some((element) => element.id === item.id)) {
      return null; // Item found in localStorage
    }

    return storedItemArray; // Item not found
  };

  const addObject = () => {
    if (!item || addType === "") return;

    const storedItemArray = checkStoredItem(item);
    if (storedItemArray === null) return; // If item is already in the array, don't add it again

    storedItemArray.push(item);

    switch (addType) {
      case "my events":
        localStorage.setItem("events", JSON.stringify(storedItemArray));
        break;
      case "my projects":
        localStorage.setItem("projects", JSON.stringify(storedItemArray));
        break;
    }

    navigate("/"); // Navigate after adding item
  };


  return (
    <div className="p-5">
      <h1 className="telekom-title">{title}</h1>
      {subtitle && <h2 className="text-2xl font-bold">{subtitle}</h2>}
      <div className="flex justify-center align-center p-4">
        <img src={image} alt={title} className="rounded-lg w-1/2" />
        <div>
          <p className="self-center m-4 text-xl leading-relaxed">
            {description}
          </p>
          {addButton && (
            <button
              onClick={addObject}
              className=" block telekom-bg p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={storedInProfile}
            >
              {"Add to " + addType}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details