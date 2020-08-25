import React from 'react';
import classes from './SendMessage.module.scss';
import Input from '../UI/Input/Input';

export default props => {
    return(
        <div className={classes.SendMessage}>
            <form onSubmit={props.onSubmitMessage}>
                <Input 
                    placeholder="Написать сообщение"
                    type="text"
                />
            </form>
        </div>
    );
};