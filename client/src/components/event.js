import Moment from "react-moment";
import FavoriteButton from "./favoriteButton";
import { Button, Card, Grid } from "semantic-ui-react";
import UpdateEventForm from "./updateEventForm";

const EventCard = (props) => {
  return (
    <Card color="purple">
      <Card.Content>
        <Card.Header>{props.eventname}</Card.Header>
        <Card.Meta className="mb-2 text-muted">{props.category}</Card.Meta>
        <br />
        <Card.Meta className="mb-2 text-muted">
          Date:{" "}
          {!props.eventdate ? (
            "TBD"
          ) : (
            <Moment format={"MM/DD/YYYY"}>{props.eventdate}</Moment>
          )}
        </Card.Meta>
        <Card.Description>{props.location}</Card.Description>
        <Card.Content extra>

        <div className="likeEditDelete">
          <Grid centered columns={3}>
            <Grid.Column>
              <FavoriteButton
                isfavorite={props.isfavorite}
                id={props.id}
                loadEvents={props.loadEvents}
              />
            </Grid.Column>
            <Grid.Column>
              <UpdateEventForm event={props.event} />
            </Grid.Column>
            <Grid.Column>
              <Button
                size="mini"
                color="pink"
                onClick={() => props.deleteEvent(props.id)}
              >
                Delete
              </Button>
            </Grid.Column>
          </Grid>
        </div>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
