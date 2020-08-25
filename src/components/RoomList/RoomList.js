import React from 'react';
import classes from './RoomList.module.scss';

export default props => {
    return(
        <nav className={classes.ChatList}>
            <h2 className="visually-hidden">Список комнат</h2>
            <ul>
                {props.rooms.map(room => {
                    return(
                        <li className={classes.ChatList__item} key={room.id}>
                            <a
                            onClick={props.onLinkClick} 
                            id={room.id}
                            >
                                {room.id}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};