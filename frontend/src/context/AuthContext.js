import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for an existing authentication token in localStorage on initial load
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const signIn = (token) => {
        localStorage.setItem('token', token); // Save the token to localStorage
        setIsAuthenticated(true); // Update the authenticated status
    };

    const signOut = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        setIsAuthenticated(false); // Update the authenticated status
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
