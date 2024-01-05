import React, { useState, useContext } from 'react';
import { loginUser } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useContext(AuthContext); // Context hook to use the AuthContext for handling authentication status
    const navigate = useNavigate(); // useNavigate hook to programmatically navigate users after login

    // Function to handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Attempt to login the user with the provided credentials
            const data = await loginUser(username, password);

            // Check if login was successful (token received)
            if (data && data.token) {
                signIn(data.token); // Update auth context
                navigate('/'); // Navigate to the home page
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Failed to login. Please try again.');
        }
    };

    // Render the login form
    return (
        <div className='login'>
            <h2>Login</h2>
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
                <div className='login-button'>
                    <button type="submit">Login</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
