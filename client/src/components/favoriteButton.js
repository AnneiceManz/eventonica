import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons'

const FavoriteButton = (props) => {

    const onClick= async (e) => {
        e.preventDefault()
        try {
            if (props.isfavorite===false) {
            await fetch(`http://localhost:8080/api/events/${props.id}/favorite`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            } else {
                            await fetch(`http://localhost:8080/api/events/${props.id}/favorite`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            }
        } catch (error) {
            
        }
    }

    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const handleOnClick= useCallback(() => {
        setIsLoading(true);

        onClick()
        .then (() => {
            setIsFavorite((current) => !current);
            setIsLoading(false);
        })
        .catch (() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <div onClick={handleOnClick}
        disabled={isLoading}>
        {isLoading ? "Loading..." :isFavorite? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartEmpty} /> }
        
        </div>
    )
}

export default FavoriteButton