import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { validationAddPhoto } from '../../utils/validation';

function AddPlacePopup (props) {

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');
    const [formValidity, setFormValidity] = React.useState({
        titleValid: false,
        linkValid: false
    })
    const titleValidity = formValidity.titleValid;
    const linkValidity = formValidity.linkValid;
    const formValid = titleValidity === true && linkValidity === true;
    const [titleError, setTitleError] = React.useState('');
    const [linkError, setLinkError] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        setTitle('');
        setLink('');
        setIsFocused(false);
    }, [props.isOpen])

    React.useEffect (() => {
        validationAddPhoto({title, link, setTitleError, setLinkError, setFormValidity, isFocused});
    }, [title, link, setFormValidity, setIsFocused])

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleLinkValue = (e) => {
        setLink(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        
        props.onAddPlace({
            name: title,
            link
        })
        
    }

    function handleFocus () {
        setIsFocused(true);
    }

    function handleBlur () {
        setIsFocused(false);
    }

    return (
        <PopupWithForm name='form-add-photo' title='Новое место' textButton={props.isLoading ? 'Сохранение...' : 'Создать'} 
        isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit} isFormValid={formValid}>
                        <label htmlFor="popup__input-title-pictire">
                            <input 
                            onChange={handleTitleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur} 
                            className={`popup__input popup__input_type_title ${!titleValidity && isFocused && 'popup__input_type_error'}`} 
                            id="popup__input-title-pictire" 
                            minLength="2" maxLength="30" 
                            name="title" type="text" placeholder="Название" 
                            value={title || ''} 
                            required />
                            <span className={`popup__input-error popup__input-title-pictire-error ${!titleValidity && 'popup__input-error_active'}`}>{titleError}</span>
                        </label>
                        <label htmlFor="popup__input-link">
                            <input
                            onChange={handleLinkValue} 
                            className={`popup__input popup__input_type_link ${!linkValidity && isFocused && 'popup__input_type_error'}`} 
                            id="popup__input-link" 
                            name="link" type="url" placeholder="Ссылка на картинку" 
                            value={link || ''} 
                            required />
                            <span className={`popup__input-error popup__input-link-error ${!linkValidity && 'popup__input-error_active'}`}>{linkError}</span>
                        </label>
        </PopupWithForm>
    )
} 

export default AddPlacePopup;