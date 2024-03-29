import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'

import './sign-up.styles.scss';

const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async event => {
        if (password !== confirmPassword) {
        event.preventDefault();
        alert("passwords don't match");
            return;
        }

        try {
            const user = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, displayName);
            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your name and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput type='input' 
                    name='displayName' 
                    value={displayName}
                    label='Display Name'
                    onChange={handleChange}
                    required
                />
                <FormInput type='email' 
                    name='email' 
                    value={email}
                    label='Email'
                    onChange={handleChange}
                    required
                />
                <FormInput type='password' 
                    name='password' 
                    value={password}
                    label='Password'
                    onChange={handleChange}
                    required
                />
                <FormInput type='password' 
                    name='confirmPassword' 
                    value={confirmPassword}
                    label='Confirm Password'
                    onChange={handleChange}
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;