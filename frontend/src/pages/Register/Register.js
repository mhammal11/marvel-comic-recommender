import React, { useState } from 'react';
import { registerUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await registerUser(username, password);
            if (response) {
                navigate('/login');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Error occurred during registration. Please try again.');
        }
    };

    return (
        <div className='register'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='username'>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='password'>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='register-button'>
                    <button type="submit">Register</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
