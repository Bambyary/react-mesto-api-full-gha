import React from 'react';

function PopupWithForm (props) {

    React.useEffect (() => {

        const escClose = (e) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        }

        const closeOnBackground = (e) => {
            if (e.target.classList.contains('popup__button-exit') || e.target.classList.contains('popup')){
                props.onClose();
            }
        }

        window.addEventListener('keydown', escClose);
        window.addEventListener('mousedown', closeOnBackground);

        return () => {
            window.removeEventListener('keydown', escClose)
            window.removeEventListener('mousedown', closeOnBackground);
        }
    }, [props])

    return (
        <div className={`popup ${props.isOpen && `popup_opened`}`} id={props.name}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form action="#" name={props.name} className="popup__form" id={`popup__${props.name}`} 
                    onSubmit={props.handleSubmit} noValidate>
                    <fieldset className="popup__fieldset">
                        {props.children}
                        <button className={`popup__button-save ${!props.isFormValid && 'popup__button-save_inactive'}`} disabled={!props.isFormValid} type="submit">{props.textButton}</button>
                    </fieldset>
                </form>
                <button className="popup__button-exit" type="button"
                    onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;