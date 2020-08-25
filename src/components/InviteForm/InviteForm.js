import React from 'react';
import Input from '../UI/Input/Input';
import classes from './InviteForm.module.scss';
import { inviteUser } from '../../server/clientServer';

export default props => {

    const cls = [classes.InviteForm, `invite-form-${props.roomNumber}`];

    const sendInvite = (evt, inviteFrom, roomNumber) => {
        evt.preventDefault();
        const input = evt.target.parentNode.querySelector('input');
        const invite = {
            name: input.value,
            room: roomNumber,
            inviteFrom: inviteFrom
        };
        inviteUser(invite);
    };

    const closeInviteForm = (evt) => {
        const form = document.querySelector(`.invite-form-${props.roomNumber}`);
        form.classList.toggle('flex');
    };

    return(
        <form className={cls.join(' ')}>
            <button 
                className={classes.InviteForm__closeBtn}
                type="button" 
                aria-label="Закрыть форму отправки"
                title="Закрыть форму отправки"
                onClick={(evt) => {closeInviteForm(evt)}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                </svg>
            </button>
            <Input
                errorMessage={props.errorMsg}
                classes={classes.InviteForm__input}
                placeholder="Имя пользователя" />
            <button className={classes.InviteForm__sendBtn}  onClick={(evt) => {sendInvite(evt, props.inviteFrom, props.roomNumber)}} type="submit">Отправить приглашение</button>
        </form>
    );
};