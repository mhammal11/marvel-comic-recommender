import React, { useState, useEffect } from 'react';
import { fetchWishlist } from '../../api/api';
import ComicCard from '../../components/ComicCard/ComicCard';
import './Wishlist.css'

const Wishlist = ({ token }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const loadWishlist = async () => {
            const items = await fetchWishlist(token);
            setWishlistItems(items);
        };

        loadWishlist();
    }, [token]);

    return (
        <div>
            <h1>My Wishlist</h1>
            <div className="comic-display">
                {wishlistItems.map(comic => (
                    <ComicCard key={comic.id} comic={comic.comic_data} token={token} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
