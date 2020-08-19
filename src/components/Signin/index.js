import React, { Component } from 'react';
import './styles.scss';
import { signInWithGoogle, auth } from './../../firebase/utils'

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const initialState = {
    email: '',
    password: ''
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        // this prevents relod after user clicks the button
        const { email, password} = this.state;

        try {

            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            });

        } catch(err) {

        }
    }

    render () {
        const { email, password } = this.state;

        return (
            <div className="signin">
                <div className="wrap">
                    <h2>
                        LogIn
                    </h2>

                    <div className="formwrap">
                        <form onSubmit={this.handleSubmit}>

                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                handleChange={this.handleChange}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                handleChange={this.handleChange}
                            />

                            <Button type="submit">
                                LOGIN
                            </Button>

                            <div className="socialSignin">
                                <div className="row">
                                    <Button onClick={signInWithGoogle}>
                                        Sign in with Google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
