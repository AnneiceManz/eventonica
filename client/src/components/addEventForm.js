import React, { useReducer, useState } from "react";
import { Form, Modal, Button } from "semantic-ui-react";

//Empty add form
const initialState = {
  eventname: "",
  location: "",
  category: "",
  eventdate: new Date(),
};

function reducer(state, action) {
  switch (action.type) {
    case "editDate":
      return { ...state, eventdate: action.value };

    case "editEventName":
      return { ...state, eventname: action.value };

    case "editLocation":
      return { ...state, location: action.value };

    case "editCategory":
      return { ...state, category: action.value };

    case "wipe":
      return { ...initialState };
    default:
      return state;
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

//ADD FORM, CHILD OF EVENTS
function AddEvent(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Handles submitting form data to db
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = state;

      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // const update = await response.json();
      // window.alert("Event submitted!");

      // props.fetchData();
      dispatch({ type: "wipe", value: { initialState } });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="addEvent">
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='small' color="purple">Add Event</Button>}
    >
      <Modal.Header>Add Event</Modal.Header>
      <Modal.Content>
        <Form
          size="large"
          id="eventSubmission"
          action="#eventSubmission"
          onSubmit={onSubmitForm}
        >
          <Form.Group widths='equal'>
            <Form.Input
              label="Event Name:"
              id="in-eName"
              type="text"
              value={state.eventname}
              onChange={(e) => {
                dispatch({ type: "editEventName", value: e.target.value });
              }}
            />

            <Form.Input
              label="Event Location:"
              id="in-eLocation"
              type="text"
              value={state.location}
              onChange={(e) => {
                dispatch({ type: "editLocation", value: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label="Event Date:"
              id="in-eDate"
              type="date"
              value={state.eventdate}
              onChange={(e) => {
                dispatch({ type: "editDate", value: e.target.value });
              }}
            />

            <Form.Select
              label="Event Category:"
              options={options}
              id="in-eCategory"
              value={state.category}
              onChange={(e) => {
                dispatch({ type: "editCategory", value: e.target.value });
              }}
            />
          </Form.Group>
        <Button id="submitEvent" size="small" color="green">
          Submit
        </Button>
        
        </Form>
      </Modal.Content>
    </Modal>
    </div>
  );
}

export default AddEvent;
