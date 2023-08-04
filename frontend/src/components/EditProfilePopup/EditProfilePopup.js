import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function EditProfilePopup (props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    const [formValidity, setFormValidity] = React.useState({
        userNameValid: true,
        descriptionValid: true
    })
    const userValidity = formValidity.userNameValid;
    const descriptionValidity = formValidity.descriptionValid
    const formValid = userValidity === true && descriptionValidity === true;
    const [nameError, setNameError] = React.useState(null);
    const [descriptionError, setDescriptionError] = React.useState(null);
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])

    React.useEffect(() => {
        const isUserNameValid = name !== undefined && name.length > 1;
        const isDescriptionValid = description !== undefined && description.length > 1;

        setNameError(() => {
            if (!isFocused) {
                return setNameError('');
            }else if (name === '') {
                return 'Введите имя'
            } else if (name !== '' && !isUserNameValid) {
                return 'Строка должна содержать не менее 2 символов'
            }
        })

        setDescriptionError(() => {
            if (!isFocused) {
                return setDescriptionError('');
            } else if (description === '') {
                return 'Введите описание'
            } else if (description !== '' && !isDescriptionValid) {
                return 'Строка должна содержать не менее 2 символов'
            }
        })

        setFormValidity(() => ({
            userNameValid: isUserNameValid,
            descriptionValid: isDescriptionValid
        }))
    }, [name, description, setFormValidity, setIsFocused])


    function handleNameChange (e) {
        setName(e.target.value);
    }

    function handleDescriptionChange (e) {
        setDescription(e.target.value);
    }

    function handleSubmit (e) {
        
        e.preventDefault();
       
        props.onUpdateUser({
            name,
            about: description
        })

    }

    function handleFocus () {
        setIsFocused(true);
    }

    function handleBlur () {
        setIsFocused(false);
    }

    return (
        <PopupWithForm name='form-profile' title='Редактировать профиль' textButton={props.isLoading ? 'Сохранение...' : 'Сохранить'} 
            isOpen={props.isOpen} onClose={props.onClose} handleSubmit={handleSubmit} isFormValid={formValid}>
            <label htmlFor="popup__input-name">
                <input 
                onChange={handleNameChange} 
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`popup__input popup__input_type_name ${!userValidity && isFocused && 'popup__input_type_error'}`} 
                id="popup__input-name" 
                minLength="2" maxLength="40" 
                name="name" type="text" placeholder="Имя" 
                value={name || ''}
                required />
                <span className={`popup__input-error popup__input-name-error ${!userValidity && 'popup__input-error_active'}`}>{nameError}</span>
            </label>
            <label htmlFor="popup__input-profession">
                <input 
                onChange={handleDescriptionChange} 
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`popup__input popup__input_type_profession ${!descriptionValidity && isFocused && 'popup__input_type_error'}`} 
                id="popup__input-profession" 
                minLength="2" maxLength="200" 
                name="about" type="text" placeholder="Вид деятельности" 
                value={description || ''} 
                required />
                <span className={`popup__input-error popup__input-profession-error ${!descriptionValidity && 'popup__input-error_active'}`}>{descriptionError}</span>
            </label>
        </PopupWithForm> 
    );
}

export default EditProfilePopup;