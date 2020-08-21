import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './styles.scss';
import { signInWithGoogle, auth } from './../../firebase/utils'

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';


const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // this prevents relod after user clicks the button
        try {
            await auth.signInWithEmailAndPassword(email, password);
                resetForm();
                props.history.push('/');

        } catch(err) {
            // console.log(err)
        }
    }

        const configAuthWrapper = {
            headline: 'LOGIN'
        };

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formwrap">
                    <form onSubmit={handleSubmit}>

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={e => setPassword(e.target.value)}
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

export default withRouter(SignIn);
