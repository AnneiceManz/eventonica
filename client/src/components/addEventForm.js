import React, { useReducer } from "react";

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
          return  {...initialState};
      default:
        return state;
    }
  }
  
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
        dispatch({type: "wipe", value: {initialState}});
  
        window.location = "/";
  
      } catch (err) {
        console.error(err.message);
      }
    };
  
    return (
      <>
        <h2 className="tableTitle">Add Event</h2>
        <form
          id="eventSubmission"
          action="#eventSubmission"
          onSubmit={onSubmitForm}
        >
          <label for="in-eDate">Event Date:</label>
          <input
            id="in-eDate"
            type="date"
            value={state.eventdate}
            onChange={(e) => {
              dispatch({ type: "editDate", value: e.target.value });
            }}
          />
  
          <label for="in-eName">Event Name:</label>
          <input
            id="in-eName"
            type="text"
            value={state.eventname}
            onChange={(e) => {
              dispatch({ type: "editEventName", value: e.target.value });
            }}
          />
  
          <label for="in-eLocation">Event Location:</label>
          <input
            id="in-eLocation"
            type="text"
            value={state.location}
            onChange={(e) => {
              dispatch({ type: "editLocation", value: e.target.value });
            }}
          />
  
          <label for="in-eCategory">Event Category:</label>
          <select
            id="in-eCategory"
            type="text"
            value={state.category}
            onChange={(e) => {
              dispatch({ type: "editCategory", value: e.target.value });
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
          
  
          <input id="submitEvent" type="submit" />
        </form>
      </>
    );
  }
  
  export default AddEvent;