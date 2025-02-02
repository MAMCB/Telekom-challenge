import { useState } from "react";
import { useEffect } from "react";
import {Events} from "./Calendar"
import {Project} from "./ProjectGrid"



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
    const [item,setItem] = useState<Events | Project | null>(null);
    useEffect(() => {
        fetch(`../../data.json`)
        .then((response) => response.json())
        .then((data) => {
            if(addType === "my events"){
                setItem(data.events.find((event:Events) => event.id === id));
            }
            else if(addType === "my projects"){
                setItem(data.projects.find((project:Project) => project.id === id));
            }
        });
    }, [id,addType]);

    const addObject = () => {
        if (!item || addType === "") return;
        else {
          const storedItem = localStorage.getItem(addType);
           const storedItemArray: (Events | Project)[] = storedItem
             ? JSON.parse(storedItem)
             : [];

           // Check if item already exists
           if (storedItemArray.some((element) => element.id === item.id))
             return;

           storedItemArray.push(item);

          switch (addType) {
            case "my events":
              localStorage.setItem("events", JSON.stringify(storedItemArray));
              break;
            case "my projects":
              localStorage.setItem("projects", JSON.stringify(storedItemArray));
              break;
          }
        }
}
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
              className=" block telekom-bg p-2 rounded-lg"
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