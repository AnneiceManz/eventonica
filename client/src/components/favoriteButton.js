import React, { useCallback, useState } from "react";
import { Icon, Button } from 'semantic-ui-react'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";

async function addFavorite(eventId) {
  try {
    await fetch(`http://localhost:8080/api/events/${eventId}/favorite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => (r.ok ? Promise.resolve(true) : Promise.reject()));
  } catch (e) {
    console.log(e);
  }
}

async function removeFavorite(eventId) {
  try {
    await fetch(`http://localhost:8080/api/events/${eventId}/favorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => (r.ok ? Promise.resolve(true) : Promise.reject()));
  } catch (e) {
    console.log(e);
  }
}

const FavoriteButton = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isfavorite);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnClick = useCallback(() => {
    setIsLoading(true);

    if (isFavorite) {
      removeFavorite(props.id)
        .then(() => {
          props.loadEvents();
          setIsFavorite((current) => !current);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      addFavorite(props.id)
        .then(() => {
          props.loadEvents();
          setIsFavorite((current) => !current);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [isFavorite]);

  return (
    <Button basic size="mini" onClick={handleOnClick} disabled={isLoading}>
      {isLoading ? (
        "Loading..."
      ) : isFavorite ? (
        <Icon size="small" color="red" name="heart"/>
      ) : (
        <Icon size="small" color="red"name="heart outline"/>
      )}
    </Button>
  );
};

export default FavoriteButton;
