import React, { useState } from 'react';

const UpdateEventForm = ({event}) => {
    // const [eventName, setEventName] = useState("");
    // const [location, setLocation] = useState("");
    // const [eventDate, setEventDate] = useState("")
    // const [category, setCategory] = useState("")
    // const id= props.eventId
    // const {initialEvent= {
    //     id: null,
    //     eventname: '',
    //     location: '',
    //     eventdate: '',
    //     category: '',
    // }} = props;

    const [updateToEvent, setUpdateToEvent] = useState(event)

    // useEffect (() => {
    //     async function fetchData() {
    //         try {
    //             let res = await fetch(`http://localhost:8080/api/events/${id}`);
    //             let event = await res.json();
    //             setEventName(props.eventname);
    //             setLocation(props.location);
    //             setEventDate(props.eventdate)
    //             setCategory(props.category)
    //         } catch (error) {
                
    //         }
    //     }
    //     fetchData(id)
    // }, [])
    function updateEvent(existingEvent) {
        fetch(`http://localhost:8080/api/events/${existingEvent.id}`, {
            method: 'PUT',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({eventname: event.eventname, eventdate: event.eventdate, location: event.location, category: event.category})
        })
        .then((res) => res.json())
        .then(
            (result)=> {
                console.log(result);
                setUpdateToEvent(result)
                // props.updateEvent(result)
            },
            (error) => {
                alert(error)
            }
            )
        }
        // let formatDate=event.date.slice(0,10)

    function handleSubmit(e) {
        if (event.id) {
            updateEvent(event)
            e.preventDefault()
        }
    }

    return (
        <>
            <h2 className="tableTitle">Update Event</h2>
        <form
          id="eventSubmission"
          action="#eventSubmission"
          onSubmit={handleSubmit}
        >
          <label for="in-eDate">Event Date:</label>
          <input
            id="in-eDate"
            value={event.eventdate}
            type="text"
            onChange={(e) => {

            setUpdateToEvent(e.target.value);
            }}
          />
  
          <label for="in-eName">Event Name:</label>
          <input
            id="in-eName"
            value={event.eventname}
            type="text"
            onChange={(e) => {

              setUpdateToEvent(e.target.value);
            }}
          />
  
          <label for="in-eLocation">Event Location:</label>
          <input
            id="in-eLocation"
            value={event.location}
              type="text"
              onChange={(e) => {

                setUpdateToEvent(e.target.value);
              }}
          />
  
          <label for="in-eCategory">Event Category:</label>
          <select
            id="in-eCategory"
            selected={event.category}
            value={event.category}
            type="text"
            onChange={(e) => {

              setUpdateToEvent(e.target.value);
            }}>
              <option value="Celebrate">Celebrate</option>
              <option value="Art/Museum">Art/Museum</option>
              <option value="Live Show">Live Show</option>
              <option value="Tech">Tech</option>
              <option value="Culture">Culture</option>
              <option value="Music">Music</option>
              <option value="Film">Film</option>
              <option value="Meetup">Meetup</option>
            </select>
          
  
          <input id="updateEvent" type="submit" />
        </form>
        </>
    );
};

export default UpdateEventForm;