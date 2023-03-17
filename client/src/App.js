import './App.css';
import Events from './components/events';
import AddEvent from './components/addEventForm';

function App() {
  return (
    <div className="App">
      <h1>My Events</h1>
      <AddEvent />
      <Events />
    </div>
  );
}

export default App;
