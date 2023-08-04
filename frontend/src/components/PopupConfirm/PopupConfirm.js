import React from "react";

function PopupWithConfirm (props) {
    
    const handleCardDelete = (e) => {
        e.preventDefault();
        props.onCardDelete(props.card);
    }

    return (
        <div className={`popup ${props.isOpen && `popup_opened`}`} id="popup-confirm">
            <div className="popup__container" id="popup__container-confirm">
                <h2 className="popup__title popup__title_confirm">Вы уверены?</h2>
                <form onSubmit={handleCardDelete} action="#" name="confirmForm" className="popup__form" id="popup__confirm" noValidate>
                    <fieldset className="popup__fieldset">
                        <button className="popup__button-save" type="submit" id="popup__button-confirm">Да</button>
                    </fieldset>
                </form>
                <button onClick={props.onClose} className="popup__button-exit" type="button"></button>
            </div>
        </div>
    )
}

export default PopupWithConfirm;