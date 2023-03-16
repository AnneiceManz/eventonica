import './App.css';
import Events from './components/events';
import AddEvent from './components/addEventForm';
import UpdateEventForm from './components/updateEventForm';

function App() {
  return (
    <div className="App">
      <h1>Techtonica 2023 events</h1>
      <Events />
      <AddEvent />
      <UpdateEventForm />
    </div>
  );
}

export default App;
