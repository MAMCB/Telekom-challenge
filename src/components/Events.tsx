
import { useState } from "react";
import { useEffect } from "react";
import Cards from "./Cards";

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  month: number;
  day: number;
  year: number;
}
const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    fetch(`../../data.json`)
      .then((response) => response.json())
      .then((data) => setEvents(data.events));
  }, []);
  return (
    <div className="p-5">
      <h1 className="telekom-title">Events</h1>
      <h2 className="text-2xl font-bold">
        Upcoming Events from Deutsche Telekom
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {events &&
          events.map((event) => (
            <Cards
              key={event.id}
              route={`/event/${event.id}`}
              img={event.image}
              title={event.title}
              description={event.description}
              subtitle={`${event.day}/${event.month}/${event.year}`}
            />
          ))}
      </div>
    </div>
  );
}

export default Events