import React, { useState, useEffect } from 'react';
import { fetchWishlist } from '../../api/api';
import ComicCard from '../../components/ComicCard/ComicCard';
import './Wishlist.css';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token && !username) {
            return
        };
        const loadWishlist = async () => {
            const items = await fetchWishlist(token);
            setWishlistItems(items);
        };

        loadWishlist();
    }, [token, username]);
    
    return (
        <div>
            {(!token && !username) ? (
                <div>
                    <h1>No Access to Wishlist</h1>
                    <p className='no-wishlist-message'>Please log in to view your wishlist!</p>
                    <Link to="/login" className="button-wishlist">Login</Link>
                    <Link to="/register" className="button-wishlist">Register</Link>
                </div>
            ) : (
                <div>
                    <h1>My Wishlist</h1>
                    <div className="comic-display">
                        {wishlistItems.map(comic => (
                            <ComicCard key={comic.id} comic={comic.comic_data} token={token} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
