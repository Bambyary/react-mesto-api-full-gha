import React from "react";
import {Link} from 'react-router-dom';

function FormRegistration (props) {
    
    return (
        <div className='registration' id={props.name}>
            <div className="registration__container">
                <h2 className="registration__title">{props.title}</h2>
                <form action="#" name={props.name} className="registration__form" id={`registration__${props.name}`} 
                    onSubmit={props.handleSubmit} noValidate>
                    <fieldset className="registration__fieldset">
                        {props.children}
                        <button className={`registration__button-save ${!props.isFormValid && 'registration__button-save_inactive'}`} disabled={!props.isFormValid} type="submit" id="registration__button-save">{props.textButton}</button>
                    </fieldset>
                </form>
                <Link to='/sign-in' className="registration__link-login">{props.textLink}</Link>
            </div>
        </div>
    )
}

export default FormRegistration;