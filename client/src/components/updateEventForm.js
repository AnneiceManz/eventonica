import React, { useState } from "react";
import { Form, Modal, Button } from "semantic-ui-react";

const UpdateEventForm = ({ event }) => {
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

  const [updateToEvent, setUpdateToEvent] = useState(event);

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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventname: event.eventname,
        eventdate: event.eventdate,
        location: event.location,
        category: event.category,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setUpdateToEvent(result);
          // props.updateEvent(result)
        },
        (error) => {
          alert(error);
        }
      );
  }
  // let formatDate=event.date.slice(0,10)

  function handleSubmit(e) {
    if (event.id) {
      updateEvent(event);
      e.preventDefault();
    }
  }
  const options = [
    { key: "ce", text: "Celebrate", value: "Celebrate" },
    { key: "a", text: "Art/Musuem", value: "Art/Museum" },
    { key: "l", text: "Live Show", value: "Live Show" },
    { key: "t", text: "Tech", value: "Tech" },
    { key: "cu", text: "Culture", value: "Culture" },
    { key: "mu", text: "Music", value: "Music" },
    { key: "f", text: "Film", value: "Film" },
    { key: "me", text: "Meetup", value: "Meetup" },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div>
      <Modal
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' color="teal">Edit</Button>}
      >
        <Modal.Header className="tableTitle">Update Event</Modal.Header>
        <Modal.Content>
          <Form
            id="eventSubmission"
            action="#eventSubmission"
            onSubmit={handleSubmit}
          >
            <Form.Group widths="equal">
              <Form.Input
                id="in-eName"
                label="Event Name:"
                placeholder={event.eventname}
                type="text"
                onChange={(e) => {
                  setUpdateToEvent(e.target.value);
                }}
              />
              <Form.Input
                id="in-eLocation"
                label="Event Location:"
                placeholder={event.location}
                type="text"
                onChange={(e) => {
                  setUpdateToEvent(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                id="in-eDate"
                label="Event Date:"
                placeholder={event.eventdate}
                type="date"
                onChange={(e) => {
                  setUpdateToEvent(e.target.value);
                }}
              />
              <Form.Select
                id="in-eCategory"
                label="Event Category"
                options={options}
                selected={event.category}
                placeholder={event.category}
                onChange={(e) => {
                  setUpdateToEvent(e.target.value);
                }}
              />
            </Form.Group>

            <Button id="updateEvent" type="submit" color="green">
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default UpdateEventForm;
