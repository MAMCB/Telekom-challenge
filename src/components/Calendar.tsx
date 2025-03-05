//to do display events from my events in a calender view, get events from local storage and data.json
import { useState } from "react";
import { useEffect } from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";

interface CalendarProps {
  year: number;
  month: number; // 0 (January) to 11 (December)
  monthName:string;
  
}

export interface Events{
  id:number;
  title:string;
  description:string;
  image:string;
  month:number;
  day:number;
  year:number;
}

interface HiglightedEvents{
  id:number;
  higlihted:boolean;
}

const Calendar = ({year,month,monthName}:CalendarProps) => {
  const [displayMonth, setDisplayMonth] = useState<CalendarProps>({year,month,monthName});
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];  
  const numberDays = new Date(displayMonth.year, displayMonth.month + 1, 0).getDate();
    const startDay = new Date(displayMonth.year, displayMonth.month, 1).getDay();

    const [events, setEvents] = useState<Events[] | []>([])
    const [highlightedEvents, setHighlightedEvents] = useState<HiglightedEvents | null>(null)  
    useEffect(() => {
      const storedEvents = localStorage.getItem("events");
      const initialEvents: Events[] = storedEvents
        ? JSON.parse(storedEvents)
        : [];

      fetch(`/data.json`)
        .then((response) => response.json())
        .then((data) => {
          const myEvents = data.profiles[0].events;
          const eventsData = data.events.filter((event: Events) =>
            myEvents.includes(event.id)
          );

          // Merge both event sources
          const completeEvents=[...initialEvents, ...eventsData];
          const sortedEvents = [...completeEvents].sort(
          (a, b) => a.year - b.year || a.month - b.month || a.day - b.day
        );
        setEvents(sortedEvents);
        });
    }, []);

    


    const previousMonth = () => {
      if (displayMonth.month === 0) {
        setDisplayMonth({ year: displayMonth.year - 1, month: 11, monthName: months[11] });
      } else {
        setDisplayMonth({ year: displayMonth.year, month: displayMonth.month - 1, monthName: months[displayMonth.month - 1] });
      }
    };

    const nextMonth = () => {
      if (displayMonth.month === 11) {
        setDisplayMonth({ year: displayMonth.year + 1, month: 0, monthName: months[0] });
      } else {
        setDisplayMonth({ year: displayMonth.year, month: displayMonth.month + 1, monthName: months[displayMonth.month + 1] });
      }
    };

  return (
    <>
      <div>
        <h1 className="text-2xl font-extrabold mx-auto">My Events</h1>
        <div className="flex gap-5">
          {displayMonth && (
            <div>
              <h1 className="text-center">{displayMonth.year}</h1>
              <h2 className="text-center">{displayMonth.monthName}</h2>
              <div className="calendar">
                {/* Days of the Week */}
                {daysOfWeek.map((day) => (
                  <div key={day} className="day">
                    {day}
                  </div>
                ))}

                {/* Empty cells for alignment */}
                {Array.from({ length: startDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="empty"></div>
                ))}

                {/* Days of the Month */}
                {Array.from({ length: numberDays }).map((_, i) => (
                  <div
                    key={i}
                    className={
                      "date" +
                      (i + 1 === new Date().getDate() &&
                      displayMonth.month === new Date().getMonth() &&
                      displayMonth.year === new Date().getFullYear()
                        ? " today"
                        : "")
                    }
                  >
                    {i + 1}
                    {events &&
                      events.map((event) => {
                        if (
                          event.month === displayMonth.month &&
                          event.year === displayMonth.year &&
                          event.day === i + 1
                        ) {
                          return (
                            <span
                              onMouseEnter={() =>
                                setHighlightedEvents({
                                  id: event.id,
                                  higlihted: true,
                                })
                              }
                              onMouseLeave={() => setHighlightedEvents(null)}
                              key={`${event.title}-${i}`}
                              className="event"
                            ></span>
                          );
                        }
                        return null;
                      })}
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <button onClick={previousMonth}>Previous</button>
                <button onClick={nextMonth}>Next</button>
              </div>
            </div>
          )}
          <Timeline>
            {events &&
              events.map((event) => (
                <Timeline.Item key={event.id}>
                  <Timeline.Point icon={HiCalendar} />
                  <Timeline.Content
                    className={
                      "rounded-lg " +
                      (highlightedEvents?.id === event.id &&
                      highlightedEvents.higlihted
                        ? " bg-green-600"
                        : "")
                    }
                  >
                    <Timeline.Time
                      className={
                        highlightedEvents?.id === event.id &&
                        highlightedEvents.higlihted
                          ? " text-white"
                          : ""
                      }
                    >
                      {months[event.month] + " " + event.day}
                    </Timeline.Time>
                    <Timeline.Title
                      className={
                        highlightedEvents?.id === event.id &&
                        highlightedEvents.higlihted
                          ? " text-white"
                          : ""
                      }
                    >
                      {event.title}
                    </Timeline.Title>
                    <Timeline.Body
                      className={
                        highlightedEvents?.id === event.id &&
                        highlightedEvents.higlihted
                          ? " text-white"
                          : ""
                      }
                    >
                      <p className="max-w-lg">{event.description}</p>
                    </Timeline.Body>
                    <Link to={`/event/${event.id}`}>
                      <Button color="gray">
                        Details
                        <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
          </Timeline>
        </div>
      </div>
    </>
  );
}

export default Calendar