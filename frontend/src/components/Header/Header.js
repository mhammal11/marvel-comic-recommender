// src/components/Header/Header.js
import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    // Returns a header element with a navigation link
    return (
        <header className="app-header">
            <Link to={'/'} style={{ textDecoration: 'none' }}><h1>Marvel Comics Recommender</h1></Link>
        </header>
    );
};

export default Header;
