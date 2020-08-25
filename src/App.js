import React from 'react';
import EnterScreen from './containers/EnterScreen/EnterScreen';
import MainScreen from './containers/MainScreen/MainScreen';
import { registerNewUser } from './server/clientServer';

class App extends React.Component {

  state = {
    isLogged: false,
    user: {
      id: null,
      name: '',
      rooms: []
    },
    errorMessage: ''
  };

  componentDidMount() {

  };

  onLoginClick = (evt) => {
    evt.preventDefault();
    const state = this.state;

    registerNewUser(state.user.name, state.user.room)
      .then((data) => {
        state.isLogged = true;
        state.user.id= data.userId;
        state.user.rooms.push(data.room);
      })
      .catch((err) => {
        state.isLogged = false;
        state.user.name = '';
        state.user.rooms = [];
        state.errorMessage = err;
      })
      .finally(() => {
        this.setState({
          ...state
        });
      })
  };

  onInputLoginChange = (value) => {
    const state = this.state;
    state.user.name = value;
    this.setState({
      state
    })
  };

  render() {
    return(
      <div className="App">
        { this.state.isLogged ? 
        <MainScreen user={this.state.user} /> 
        : 
        <EnterScreen 
          onLoginClick={this.onLoginClick}
          onInputLoginChange={this.onInputLoginChange}
          errorMessage = {this.state.errorMessage} />}
      </div>
    )
  };
}

export default App;
