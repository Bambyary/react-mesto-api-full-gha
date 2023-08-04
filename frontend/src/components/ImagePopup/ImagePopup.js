function ImagePopup ({card, onClose}) {
    return (
        <div className={`popup ${card.link && 'popup_opened'}`} id="popup-images">
            <div className="popup__image-container">
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__heading"></p>
                <button onClick={onClose} className="popup__button-exit" type="button"></button>
            </div>
        </div>
    );
}

export default ImagePopup;