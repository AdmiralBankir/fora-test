import React from 'react';
import classes from './Input.module.scss'



function isValid({valid, touched}) {
    if(!touched) return true;
    
    return valid;
}

export default props => {

    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if(!isValid(props)) {
        cls.push(classes.invalid)
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className={props.classes}
                />
            <span>{props.errorMessage}</span>
        </div>
    );
};