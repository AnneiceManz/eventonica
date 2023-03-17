import './App.css';
import Events from './components/events';
import AddEvent from './components/addEventForm';

function App() {
  return (
    <div className="App">
      <AddEvent />
      <h1>My Events</h1>
      <Events />
    </div>
  );
}

export default App;
