import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Events from './components/events';
import AddEvent from './components/addEventForm';

function App() {
  return (
    <div className="App">
      <h1>Techtonica 2023 events</h1>
      <Events />
      <AddEvent />
    </div>
  );
}

export default App;
