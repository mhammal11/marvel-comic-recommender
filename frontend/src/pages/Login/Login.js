import React, { useState, useContext } from 'react';
import { loginUser } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await loginUser(username, password);
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
