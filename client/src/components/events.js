import { useState, useEffect, useCallback } from "react";
import EventCard from "./event";
import CardGroup from "react-bootstrap/CardGroup";
import UpdateEventForm from "./updateEventForm";

async function getEvents() {
  try {
    return fetch("http://localhost:8080/api/events").then((r) =>
      r.ok ? Promise.resolve(r.json()) : Promise.reject()
    );
  } catch (e) {
    console.log(e);
  }
}

function Events() {
  const [events, setEvents] = useState([]);
  const loadEvents = useCallback(() => {
    getEvents().then((data) => setEvents(data))
  }, [])

  useEffect(() => {
    loadEvents()
  }, []);

  const [event, setEvent] = useState({});

  const updateEvent = (event) => {
    console.log(event);
    // let formatDate = event.date.splice(-1,14)
    // event.date = formatDate
    setEvent(event);
  };

  const deleteEvent = async (id) => {
    try {
      const deleteEvent = await fetch(
        `http://localhost:8080/api/events/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(deleteEvent);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <CardGroup className="Events">
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventname={event.eventname}
            location={event.location}
            eventdate={event.eventdate}
            category={event.category}
            isfavorite={event.isfavorite}
            id={event.id}
            updateEvent={updateEvent}
            event={event}
            deleteEvent={deleteEvent}
            loadEvents={loadEvents}
          />
        ))}
      </CardGroup>
      <UpdateEventForm event={event} />
    </>
  );
}

export default Events;
