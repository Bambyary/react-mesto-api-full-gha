export const validationProfile = (props) => {
    const isUserNameValid = props.name !== undefined && props.name.length > 1;
        const isDescriptionValid = props.description !== undefined && props.description.length > 1;

        props.setNameError(() => {
            if (!props.isFocused) {
                return props.setNameError('');
            }else if (props.name === '') {
                return 'Введите имя'
            } else if (props.name !== '' && !isUserNameValid) {
                return 'Строка должна содержать не менее 2 символов'
            }
        })

        props.setDescriptionError(() => {
            if (!props.isFocused) {
                return props.setDescriptionError('');
            } else if (props.description === '') {
                return 'Введите описание'
            } else if (props.description !== '' && !isDescriptionValid) {
                return 'Строка должна содержать не менее 2 символов'
            }
        })

        props.setFormValidity(() => ({
            userNameValid: isUserNameValid,
            descriptionValid: isDescriptionValid
        }))
}

export const validationAvatar = (props) => {
    const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    const avatarValid = props.avatar !== undefined && httpRegex.test(props.avatar);

    props.setAvatarError(() => {
        if (!props.isFocused) {
            props.setAvatarError('')
        } else if (props.avatar === '') {
            return 'Введите ссылку на картинку'
        } else if (props.avatar !== '' && !avatarValid) {
            return 'Введена некорректная ссылка'
        }
    })

    props.setAvatarValidity(() => ({
        avatarLinkValid: avatarValid
    }))
}

export const validationAddPhoto = (props) => {
    const isTitleValid = props.title !== undefined && (props.title.length > 1 && props.title.length < 30);

        const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
        const isLinkValid = props.link !== undefined && httpRegex.test(props.link);
        

        props.setTitleError(() => {
            if (!props.isFocused) {
                return props.setTitleError('');
            } else if (props.title === '') {
                return 'Введите название'
            } else if (props.title !== '' && !isTitleValid) {
                return 'Строка должна содержать не менее 2 символов и не более 30 символов'
            }
        })

        props.setLinkError(() => {
            if (!props.isFocused) {
                return props.setLinkError('');
            } else if (props.link === '') {
                return 'Введите ссылку на картинку'
            } else if (props.link !== '' && !isLinkValid) {
                return 'Введена некорректная ссылка'
            }
        })

        props.setFormValidity(() => ({
            titleValid: isTitleValid,
            linkValid: isLinkValid
        }))
}

export const validationLogin = (props) => {
        const isEmailValid = props.email !== undefined && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(props.email);
        const isPasswordValid = props.password !== undefined && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(props.password) && props.password.length > 6;

        props.setEmailError(() => {
            if (!props.isFocused) {
                return props.setEmailError('');
            } else if (props.email === '') {
                return 'Введите email'
            } else if (props.email !== '' && !isEmailValid) {
                return 'Введён некорректный email'
            }
        })

        props.setPasswordError(() => {
            if (!props.isFocused) {
                return props.setPasswordError('');
            } else if (props.password === '') {
                return 'Введите пароль'
            } else if (props.password !== '' && !isPasswordValid) {
                return 'Пароль должен содержать латинские символы верхнего и нижнего регистра и хотя бы одну цифру'
            }
        })

        props.setFormValidity({
            emailValid: isEmailValid,
            passwordValid: isPasswordValid
        })
}