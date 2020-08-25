import React from 'react';
import classes from './Title.module.scss';


export default props => {

    const onMembershipsClick = (evt) => {
        evt.preventDefault();
        const list = document.querySelector(`.membership-list-${props.title}`);
        list.classList.toggle('none');
    };

    const onInviteClick = (evt) => {
        const form = document.querySelector(`.invite-form-${props.title}`);
        form.classList.toggle('flex');
    };

    return(
        <div className={classes.Title}>
            <h2>{`Комната № ${props.title}`}</h2>
            <div className={classes.Title__btnWrapper}>
                <button className={classes.Title__btnMembers} title="Показать пользователей в комнате" onClick={(evt) => {onMembershipsClick(evt)}} type="button">{`${props.users.length} users`}</button>
                <ul
                     className={`membership-list-${props.title} none`}
                     aria-label="Список пользователей, находящихся в комнате"
                 >
                    {props.users.map((name, index) => {
                        return(
                         <li key={name + index}>
                              {name}
                        </li>
                         )
                     })}
                </ul>
                <button className={classes.Title__btnInvite} onClick={(evt) => {onInviteClick(evt)}} aria-label="Пригласить пользователя в комнату"  title="Отправить приглашение" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm15.398 15.8c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/>
                    </svg>
                 </button>
            </div>
        </div>
    );
};