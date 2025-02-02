//to do add button to add event to my events, save in local storage the event id
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Details from "./Details";

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  month: number;
  day: number;
  year: number;
}

const EventDetails = () => {
   const { id } = useParams<{ id: string }>();
        const [event, setEvent] = useState<Event|null>(null)
        useEffect(() => {
            fetch(`../../data.json`)
            .then((response) => response.json())
            .then((data) => setEvent(data.events.find((event:Event) => event.id === parseInt(id? id : ""))))
        }, [id])
  return (
    <>
      {event && (
        <Details title={event.title} description={event.description} image={event.image} />
      )}
    </>
  );
};

export default EventDetails;
