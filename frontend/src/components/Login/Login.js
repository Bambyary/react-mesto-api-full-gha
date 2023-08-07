import React from "react";
import FormRegistration from "../FormRegistration/FormRegistration";
import Header from "../Header/Header";
import * as auth from '../../utils/auth';
import {useNavigate} from 'react-router-dom';
import {validationLogin} from '../../utils/validation';

function Login (props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [formValidity, setFormValidity] = React.useState({
        emailValid: false,
        passwordValid: false
    })
    const emailValidity = formValidity.emailValid;
    const passwordValidity = formValidity.passwordValid;
    const formValid = emailValidity === true && passwordValidity === true;
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        setEmail('');
        setPassword('');
    }, [])

    React.useEffect(() => {
        validationLogin({email, password, setEmailError, setPasswordError, setFormValidity, isFocused});
    }, [email, password, setFormValidity, setIsFocused])

    function handleLoginChange (e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange (e) {
        setPassword(e.target.value);
    }

    function handleFocus () {
        setIsFocused(true);
    }

    function handleBlur () {
        setIsFocused(false);
    }

    function handleSubmit (e) {
        e.preventDefault();

        auth.authorize(email, password).then(data => {
            props.userEmail({
                email: email
            })
            if (data.token) {
                setEmail('');
                setPassword('');
                props.handleLogin();
                navigate('/', {replace: true})
            }
        }).catch(e => {
            console.log(e)
            props.handleRegister();
            props.handleSuccess(false);
        })
    }

    return (
        <>
            <Header buttonText='Регистрация' path='/sign-up'/>
            <FormRegistration name='form-login' title='Вход' textButton='Войти'
                handleSubmit={handleSubmit}
                isFormValid={formValid}>
            <label htmlFor="registration__input-email">
                <input 
                onChange={handleLoginChange} 
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`registration__input ${!emailValidity && isFocused && 'registration__input_type_error'}`} 
                id="registration__input-email" 
                minLength="2" maxLength="30" 
                name="email" type="text" placeholder="Email" 
                value={email || ''} 
                required />
                <span className={`registration__input-error ${!emailValidity && 'registration__input-error_active'}`}>{emailError}</span>
            </label>
            <label htmlFor="registration__input-password">
                <input
                onChange={handlePasswordChange}
                onFocus={handleFocus}
                onBlur={handleBlur} 
                className={`registration__input ${!passwordValidity && isFocused && 'registration__input_type_error'}`} 
                id="registration__input-password" 
                name="password" type="password" placeholder="Пароль" 
                value={password || ''} 
                required />
                <span className={`registration__input-error ${!passwordValidity && 'registration__input-error_active'}`}>{passwordError}</span>
            </label>
            </FormRegistration>
        </>
    )
}

export default Login;