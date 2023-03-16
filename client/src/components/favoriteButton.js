import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons'

const FavoriteButton = (props) => {

    const [isFavorite, setIsFavorite] = useState(false)
    const onChange= (e) => {
        e.preventDefault()
        if (isFavorite===true) {
            setIsFavorite(false)
        } else {
            setIsFavorite(true)
        }
    }
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

    return (
        <div onClick={onClick}>
        {props.isfavorite ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartEmpty} /> }
        
        </div>
    )
}

export default FavoriteButton