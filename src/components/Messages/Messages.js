import React from 'react';
import classes from './Messages.module.scss';

export default props => {
    return(
        <div className={classes.Messages}>
            <ul className={classes.Messages__list}>
            {props.messages.map((message, index) => {
                return(
                    <li key={index}>
                        <span className={classes.Messages__name}>{message.name}</span>
                        <span className={classes.Messages__text}>{message.text}</span>
                        <span className={classes.Messages__time}>{message.time.hours}:{message.time.minutes}</span>
                    </li>
                )
            })}
            </ul>
        </div>
    );
};