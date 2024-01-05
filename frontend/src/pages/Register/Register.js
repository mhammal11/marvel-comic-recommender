import React, { useState } from 'react';
import { registerUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook to programmatically navigate users after registration

    // Function to handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Attempt to register the user with the provided credentials
            const response = await registerUser(username, password);

            // Check if registration was successful (response status is 201)
            if (response && response.status === 201) { 
                navigate('/login');
            } else {
                // If the response status is not 201, assume it's an error
                setError(response.response.data || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Error occurred during registration. Please try again.');
        }
    };

    // Render the registration form
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
