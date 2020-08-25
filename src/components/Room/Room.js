import React from 'react';

import Title from '../Title/Title';
import Messages from '../Messages/Messages';
import SendMessage from '../SendMessage/SendMessage';
import InviteForm from '../InviteForm/InviteForm';
import { sendMessage, getSocket } from '../../server/clientServer';

const socket = getSocket();


class Room extends React.Component {

    constructor(props) {
        const initialstate = {
            messages: [],
            user: props.user,
            room: props.room,
            errMsg: ''
        }
        super(initialstate);

        this.state = {
            ...initialstate
        }
    };

    componentWillUpdate(nextProps) {
        const messagesList = document.querySelector('.' + nextProps.className + ' ' + 'ul');
        messagesList.scrollTop = messagesList.scrollHeight;
    };

    componentDidMount() {
        socket.on('newMessage', (data) => {
            const state = this.state;
            if(data.room === this.state.room.id) {
                state.messages.push(data);
                this.setState({
                   ...state
                 });
            }
        });

        socket.on('userNotFound', (data) => {
            const state = this.state;
            state.errMsg = data.text;
            this.setState({
                ...state
              });
        });
    };

    onSubmitMessage = (evt) => {
        evt.preventDefault();
        let state = this.state;
        const form = evt.target;
        const inputMessage = form.querySelector('input');

        if(inputMessage.value.trim() !== '') {
            const date = new Date();
            const msg = {
                name: state.user.name,
                room: state.room.id,
                text: inputMessage.value,
                time: {
                    hours: date.getHours(),
                    minutes: date.getMinutes()
                }
            };

            sendMessage(msg);
    
            inputMessage.value = '';
        }
    };

    render() {
        return(
          <main
            className={this.props.className} 
            room={this.props.room.id} 
          >
            <Title 
                title={this.props.room.id}
                users={this.props.room.users}
                 />
            <InviteForm
                roomNumber={this.state.room.id}
                inviteFrom={this.state.user.name}
                errorMsg={this.state.errMsg}
                />
            <Messages messages={this.state.messages} />
            <SendMessage onSubmitMessage={this.onSubmitMessage} />
          </main>
        );
    };
};

export default Room;