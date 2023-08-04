import React from 'react';
import Card from '../Card/Card.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { CurrentCards } from '../../contexts/CurrentCards.js';
import Header from '../Header/Header.js';

function Main (props) {

    const currentUser = React.useContext(CurrentUserContext);
    const cards = React.useContext(CurrentCards);
    
    return (
        
        <>
            <Header buttonText='Выйти' path='/sign-in' userEmail={props.userEmail} />
            <main className="main">
            <section className="profile">
                <div className="profile__avatar-wrapper"
                    onClick={props.onEditAvatar}>
                    <div className='profile__avatar' style={{backgroundImage:`url(${currentUser.avatar})`}} 
></div>
                </div>
                <div className="profile__info">
                    <div className="profile__flex">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button"
                            onClick={props.onEditProfile}
                            type="button"></button>
                    </div>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button"
                    onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {
                    cards.map((card) => {
                        
                        return (
                            <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={props.onCardClick} 
                            onCardLike={props.onCardLike}
                            onPopupConfirm={props.onPopupConfirm}/>
                        )
                    })
                }
            </section>

        </main>
        </>
    );
}

export default Main;