//to do display events from my events in a calender view, get events from local storage and data.json
import { useState } from "react";
import { useEffect } from "react";

interface CalendarProps {
  year: number;
  month: number; // 0 (January) to 11 (December)
  monthName:string;
  
}

interface Events{
  id:number;
  title:string;
  description:string;
  image:string;
  month:number;
  day:number;
  year:number;
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
    useEffect(() => {
      const storedEvents = localStorage.getItem("events");
      const initialEvents: Events[] = storedEvents
        ? JSON.parse(storedEvents)
        : [];

      fetch(`../../data.json`)
        .then((response) => response.json())
        .then((data) => {
          const myEvents = data.profiles[0].events;
          const eventsData = data.events.filter((event: Events) =>
            myEvents.includes(event.id)
          );

          // Merge both event sources
          setEvents([...initialEvents, ...eventsData]);
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
              <div key={i} className={"date" + (i + 1 === new Date().getDate() && displayMonth.month === new Date().getMonth() && displayMonth.year === new Date().getFullYear() ? " today" : "")}>
                {i + 1}
                {events && events.map((event) => {
                  if (event.month === displayMonth.month && event.year === displayMonth.year && event.day === i + 1) {
                    return <span key={`${event.title}-${i}`} className="event"></span>;
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
    </>
  );
}

export default Calendar