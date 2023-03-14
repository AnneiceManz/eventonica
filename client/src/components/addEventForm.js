import React, { useReducer } from "react";

//Empty add form
const initialState = {
    name: "Event Name",
    location: "Where is your event?",
    category: "Category",
    date: new Date(),
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case "editDate":
        return { ...state, date: action.value };
  
      case "editName":
        return { ...state, name: action.value };
  
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
  
  //ADD FORM, CHILD OF EVENTBOARD
  function AddEvent(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const body = state;
        //console.log("Attempting to post...", JSON.stringify(body)); // TEST
  
        const response = await fetch("http://localhost:8080/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const update = await response.json();
        window.alert("Event submitted!");
  
        props.fetchData();
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
            value={state.date}
            onChange={(e) => {
              dispatch({ type: "editDate", value: e.target.value });
            }}
          />
  
          <label for="in-eName">Event Name:</label>
          <input
            id="in-eName"
            type="text"
            value={state.name}
            onChange={(e) => {
              dispatch({ type: "editName", value: e.target.value });
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
          <input
            id="in-eCategory"
            type="text"
            value={state.category}
            onChange={(e) => {
              dispatch({ type: "editCategory", value: e.target.value });
            }}
          />
  
          <input id="submitEvent" type="submit" />
        </form>
      </>
    );
  }
  
  export default AddEvent;