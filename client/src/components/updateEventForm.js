import React, { useState, useEffect } from 'react';

const UpdateEventForm = (props) => {
    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [eventDate, setEventDate] = useState("")
    const [category, setCategory] = useState("")
    const id= props.id

    useEffect (() => {
        async function fetchData() {
            try {
                let res = await fetch(`http://localhost:8080/api/events/${id}`);
                let event = await res.json();
                setEventName(event.eventname);
                setLocation(event.location);
                setEventDate(event.eventdate)
                setCategory(event.category)
            } catch (error) {
                
            }
        }
        fetchData(id)
    }, [])

    function updateEvent() {
        fetch(`http://localhost:8080/api/events/${id}`, {
            method: 'PUT',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(updateEvent)
        })
        .then((res) => res.json())
        .then(
            (result)=> {
                console.log(result);
                if (result.success) {
                    alert(result.message);
                }
            },
            (error) => {
                alert(error)
            }
        )
    }

    return (
        <>
            <h2 className="tableTitle">Update Event</h2>
        <form
          id="eventSubmission"
          action="#eventSubmission"
          onSubmit={updateEvent}
        >
          <label for="in-eDate">Event Date:</label>
          <input
            id="in-eDate"
            value={eventDate}
            type="date"
            onChange={(e) => {
            e.preventDefault();
            setEventDate(e.target.value);
            }}
          />
  
          <label for="in-eName">Event Name:</label>
          <input
            id="in-eName"
            value={eventName}
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setEventName(e.target.value);
            }}
          />
  
          <label for="in-eLocation">Event Location:</label>
          <input
            id="in-eLocation"
            value={location}
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setLocation(e.target.value);
              }}
          />
  
          <label for="in-eCategory">Event Category:</label>
          <select
            id="in-eCategory"
            value={category}
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setCategory(e.target.value);
            }}>
              <option value="Celebrate">Celebrate</option>
              <option value="Art/Musuem">Art/Museum</option>
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