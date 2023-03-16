import { useState, useEffect } from "react";
import EventCard from "./event";
import CardGroup from 'react-bootstrap/CardGroup';
import UpdateEventForm from "./updateEventForm";



function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/events")
          .then((response) => response.json())
          .then(events => {
            setEvents(events); 
            console.log('Events fetched...', events);
            });
          }, []);

          const [eventId, setEventId] = useState(null)

          const updateEvent = (id) => {
            setEventId(id)
          }

  return (
    <>
    <CardGroup className="Events">
            {events.map(event =>
            <EventCard key={event.id} eventname={event.eventname} location={event.location} eventdate={event.eventdate} category={event.category} isfavorite={event.isfavorite} id={event.id} updateEvent={updateEvent} />
            )}
          </CardGroup>
          <UpdateEventForm eventId={eventId} />
          </>
  );
}

export default Events;