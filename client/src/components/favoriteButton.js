import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons'

const FavoriteButton = (props) => {

    // const [isFavorite, setIsFavorite] = useState(false)
    const onClick= (e) => {
        // if (isFavorite===true) {
        //     setIsFavorite(false)
        // } else {
        //     setIsFavorite(true)
        // }
    }

    return (
        <div onClick={onClick}>
        {props.isfavorite ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartEmpty} /> }
        
        </div>
    )
}

export default FavoriteButton