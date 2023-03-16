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

          const [event, setEvent] = useState({})

          const updateEvent = (event) => {
            console.log(event)
            // let formatDate = event.date.splice(-1,14)
            // event.date = formatDate
            setEvent(event)
          }

  return (
    <>
    <CardGroup className="Events">
            {events.map(event =>
            <EventCard key={event.id} eventname={event.eventname} location={event.location} eventdate={event.eventdate} category={event.category} isfavorite={event.isfavorite} id={event.id} updateEvent={updateEvent} event={event}/>
            )}
          </CardGroup>
          <UpdateEventForm event={event} />
          </>
  );
}

export default Events;