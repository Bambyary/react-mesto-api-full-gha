import React from "react";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Card (props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = currentUser._id === props.card.owner._id; 
    const isLiked = props.card.likes.some((like) => like._id === currentUser._id);
    const cardLikeButtonClassName = (`element__button-like ${isLiked && 'element__button-like_active'}`);
    
    const handleClick  = () => {
        props.onCardClick(props.card);
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card);
    }

    return (
        <article className="element">
                <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
                <div className="element__place">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__like-box">
                        <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                        <p className="element__like-length">{props.card.likes.length}</p>
                    </div>
                </div>
                {isOwn && <button onClick={() => {props.onPopupConfirm(props.card)}} className="element__button-trash " type="button"></button>}
        </article>
    )
}

export default Card;