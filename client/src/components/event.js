import Card from 'react-bootstrap/Card';
import Moment from "react-moment";
import FavoriteButton from './favoriteButton';
// import DeleteEvent from './DeleteEvent';

const EventCard = (props) =>{

    return(
    <Card style={{ width: '18rem'}}>
    <Card.Body>
      <Card.Title>{props.eventname}</Card.Title>
      <Card.Subtitle className='mb-2 text-muted'>{props.category}</Card.Subtitle>
      <br />
      <Card.Subtitle className="mb-2 text-muted">Date: {!props.eventdate ? "TBD" : <Moment format={"MM/DD/YYYY"}>{props.eventdate}</Moment>}</Card.Subtitle>
      <Card.Text>
        {props.location}
      </Card.Text>
      <FavoriteButton isfavorite={props.isfavorite} id={props.id}/>
      <div className='addDeleteDiv'>
      <button onClick={()=> props.updateEvent(props.event)}>Update</button>
      <button onClick={() => props.deleteEvent(props.id)}>Delete</button>
      {/* <DeleteEvent id={props.event.id} event={props.event} /> */}
      </div>
    </Card.Body>
  </Card>
  )}

export default EventCard;