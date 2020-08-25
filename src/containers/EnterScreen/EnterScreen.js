import React from 'react';
import classes from './EnterScreen.module.scss'

import Input from '../../components/UI/Input/Input';

class EnterScreen extends React.Component {
    state = {
        isInputValid: false,
        isInputTouched: false
    };

    onInputChange = (evt) => {
        let isInputValid = false;
        const isInputTouched = true;
        
        (evt.target.value.trim() !== '') 
        ?
        isInputValid = true
        :
        isInputValid = false;

        this.setState({
            isInputValid,
            isInputTouched
        })

        if (isInputValid) {
            this.props.onInputLoginChange(evt.target.value);
        } 

    };

    render() {
        return(
          <div className={classes.EnterScreen}>
            <div>
                <h1>Введите своё имя</h1>
                <form onSubmit={(evt) => {evt.preventDefault()}}>
                    <div className={classes.EnterScreen__container}>
                        <Input
                         valid={this.state.isInputValid}
                         touched={this.state.isInputTouched}
                         onChange={(evt) => {this.onInputChange(evt)}}
                         errorMessage={this.props.errorMessage}
                         placeholder="Имя"
                         />
                        <button type="submit"
                        onClick={(evt) => {this.props.onLoginClick(evt)}}
                        disabled={!this.state.isInputValid}
                        >
                        Войти
                        </button>
                    </div>
                </form>
            </div>
          </div>
        );
    };
};

export default EnterScreen;