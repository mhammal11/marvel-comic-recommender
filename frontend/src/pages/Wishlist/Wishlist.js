import React, { useState, useEffect } from 'react';
import { fetchWishlist } from '../../api/api';
import ComicCard from '../../components/ComicCard/ComicCard';
import './Wishlist.css';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const username = localStorage.getItem('username'); // Retrieve username from local storage
    const token = localStorage.getItem('token') // Retrieve token from local storage

    useEffect(() => {
        // Check if the user is not logged in
        if (!token && !username) {
            return
        };

        // Function to load wishlist items
        const loadWishlist = async () => {
            const items = await fetchWishlist(token); // Fetch wishlist items using token
            setWishlistItems(items);
        };

        loadWishlist(); // Invoke the function to load wishlist
    }, [token, username]); // Run effect when token or username changes
    
    // Render different content based on user's login status
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
                    {(wishlistItems.length > 0) ? (
                        <div className="comic-display">
                            {wishlistItems.map(comic => (
                                <ComicCard key={comic.id} comic={comic.comic_data} token={token} />
                            ))}
                        </div>
                    ) : (
                        <div className='no-wishlist-message'>You don't have any comics in your wishlist</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
