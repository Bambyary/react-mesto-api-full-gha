import React from 'react';
import logo from '../../image/Vector.svg';
import {useLocation, useNavigate} from 'react-router-dom';

function Header (props) {

    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState(props.userEmail);
    const [isBurgerActive, setIsBurgerActive] = React.useState(false);

    function signOut () {
        if(props.buttonText === 'Выйти') {
            localStorage.removeItem('token');
            setEmail('');
            navigate('/sign-in', {replace: true})
        } else if (props.buttonText === 'Войти') {
            navigate('/sign-in', {replace: true})
        } else if (props.buttonText === 'Регистрация') {
            navigate('/sign-up', {replace: true})
        }
    }

    function clickBurger () {
        if (!isBurgerActive) {
            setIsBurgerActive(true);
        } else {
            setIsBurgerActive(false);
        }
    }

    return (
        <>
            {isBurgerActive && 
            <div className='header__menu-burger'>
                <p className='header__burger-email'>{email}</p>
                <button onClick={signOut} className='header__button-burger-exit'>{props.buttonText}</button>
            </div>}
            <header className="header">
                <img className="header__logo" src={logo} alt="Логотип" />
                <div className='header__menu'>
                    {location.pathname ==='/' && <p className='header__email'>{email}</p>}
                    <button onClick={signOut} className={`header__button ${location.pathname ==='/' && 'header__button_inactive'}`}>{props.buttonText}</button>
                    {location.pathname==='/' && !isBurgerActive ? 
                        <button onClick={clickBurger} className='header__button-burger'>
                            <div className='header__button-burger-item'></div>
                            <div className='header__button-burger-item'></div>
                            <div className='header__button-burger-item'></div>
                        </button>
                        :
                        location.pathname==='/' && <button onClick={clickBurger} className='header__button-burger-close'></button>}
                </div>
            </header>
        </>
    );
}

export default Header;