import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { validationAvatar } from '../../utils/validation';

function EditAvatarPopup (props) {

    const [avatar, setAvatar] = React.useState('');
    const inputRef = React.useRef();
    const [avatarValidity, setAvatarValidity] = React.useState({
        avatarLinkValid: false
    });
    const [avatarError, setAvatarError] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        setAvatar('');
    }, [props.isOpen])

    React.useEffect(() => {

        validationAvatar({setAvatarError, avatar, setAvatarValidity, isFocused});

    }, [avatar, setAvatarValidity, setIsFocused])

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value
        })

    }

    const handleAvatarChange = (e) => {
        setAvatar(e.target.value);
    }

    function handleFocus () {
        setIsFocused(true);
    }

    function handleBlur () {
        setIsFocused(false);
    }

    return (
        <PopupWithForm name='form-avatar' title='Обновить аватар' textButton={props.isLoading ? 'Сохранение...' : 'Сохранить'} 
            isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit} isFormValid={avatarValidity.avatarLinkValid}>
                        <label htmlFor="popup__input-avatar-pictire">
                            <input 
                            ref={inputRef}
                            onChange={handleAvatarChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur} 
                            className={`popup__input popup__input_type_avatar ${!avatarValidity.avatarLinkValid && isFocused && 'popup__input_type_error'}`} 
                            id="popup__input-avatar-pictire" 
                            minLength="2" name="avatar" 
                            type="text" placeholder="Введите ссылку" 
                            value={'' || avatar} 
                            required />
                            <span className={`popup__input-error popup__input-avatar-pictire-error ${!avatarValidity.avatarLinkValid && 'popup__input-error_active'}`}>{avatarError}</span>
                        </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;