import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import { signInWithGoogle, auth } from './../../firebase/utils'

import AuthWrapper from './../AuthWrapper';
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

        const configAuthWrapper = {
            headline: 'LOGIN'
        };

        return (
            <AuthWrapper {...configAuthWrapper}>
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
                        <div className="links">
                            <Link to="/recovery">
                                Forgot Password? Reset
                            </Link>
                        </div>
                    </form>
                </div>
            </AuthWrapper>
        
        );
        
    }
}

export default SignIn;
