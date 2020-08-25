import React from 'react';

import Room from '../../components/Room/Room';
import RoomList from '../../components/RoomList/RoomList';
import classes from './MainScreen.module.scss';
import { getSocket } from '../../server/clientServer';

const socket = getSocket();

class MainScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeRoom: props.user.rooms[0].id,
            loading: false,
            user: props.user
        };
    };

    componentDidMount() {
        socket.on('newInvite', (data) => {
            const state = this.state;
            state.user.rooms.push(data);
            this.setState({
                ...state
            });
        });

        socket.on('userConnected', (data) => {
            const state = this.state;
            const room = state.user.rooms.find((room) => room.id === data.id);
            room.users = data.users;
            state.inviteForm = false;
            this.setState({
                ...state
            })
        });

        socket.on('userDisconnected', (data) => {
            const state = this.state;
            state.user.rooms.forEach((room) => {
                room.users = room.users.filter((user) => user !== data);
            })

            this.setState({
                ...state
            })
        });
    };

    renderChats = () => {   
        return(
            this.state.user.rooms.map((room, index) => {
                let className = {};

                (room.id === +this.state.activeRoom)
                ?
                className = classes.MainScreen__chat
                :
                className = classes.MainScreen__chatHidden

                return(
                    <Room
                        className={className} 
                        user={this.state.user}
                        room={room}
                        key={index + room.id}
                    />
                )
            })
        );
    };

    onLinkClick = (evt) => {
        const activeRoom= evt.target.getAttribute('id');
        this.setState({
            activeRoom
        })
    };

    render() {
        return(
          <div className={classes.MainScreen}>
             <div className={classes.MainScreen__container}>
                {
                    this.state.loading
                    ? null
                    : <React.Fragment>
                        <RoomList
                        rooms = {this.state.user.rooms}
                        onLinkClick = {(evt) => {this.onLinkClick(evt)}}
                        />
                        {this.renderChats()}
                    </React.Fragment>
                }
             </div>
          </div>
        );
    };
};

export default MainScreen;