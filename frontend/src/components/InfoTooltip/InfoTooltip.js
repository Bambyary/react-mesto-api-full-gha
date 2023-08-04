import React from "react";

function InfoTooltip (props) {
    return (
        <div className={`popup ${props.isOpen && `popup_opened`}`} id={props.name}>
            <div className="popup__container">
                <div className={`popup__mark ${props.isSuccess ? 'popup__mark_ok' : 'popup__mark_error'}`}></div>
                <h2 className="popup__title popup__title_mark">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}</h2>
                <button className="popup__button-exit" type="button"
                    onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;