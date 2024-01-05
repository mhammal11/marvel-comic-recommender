import React, { useState, useEffect } from 'react';
import { fetchWishlist, addToWishlist, removeFromWishlist } from '../../api/api';
import defaultWishlistIcon from '../../assets/wishlist.png';
import activeWishlistIcon from '../../assets/wishlist_red.png';
import './ComicCard.css';

const ComicCard = ({ comic, token }) => {
    // State for wishlist status and icon
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlistIcon, setWishlistIcon] = useState(defaultWishlistIcon);

    // useEffect to check wishlist status on component mount
    useEffect(() => {
        const checkWishlistStatus = async () => {
            if (!token) {
                return; // Don't proceed if the user is not logged in
            }
            try {
                const wishlist = await fetchWishlist(token);
                // Set wishlist status and icon based on whether comic is in wishlist
                if (wishlist && wishlist.some(item => item.comic_id === comic.id)) {
                    setIsInWishlist(true);
                    setWishlistIcon(activeWishlistIcon);
                }
            } catch (error) {
                console.error('Error checking wishlist status', error);
            }
        };

        checkWishlistStatus();
    }, [comic.id, token]);

    // Function to handle wishlist add/remove actions
    const handleWishlistToggle = async () => {
        if (!token) {
            return; // Don't proceed if the user is not logged in
        }
        try {
            // Add or remove from wishlist and update state and icon
            if (isInWishlist) {
                await removeFromWishlist(comic.id, token);
                setIsInWishlist(false);
                setWishlistIcon(defaultWishlistIcon);
            } else {
                await addToWishlist(comic, token);
                setIsInWishlist(true);
                setWishlistIcon(activeWishlistIcon);
            }
        } catch (error) {
            console.error('Failed to update wishlist', error);
        }
    };

    // Render comic card with image, info, and wishlist icon
    return (
        <div className="comic-card">
            <img 
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                alt={comic.title} 
                className="comic-image"
            />
            <div className="comic-info">
                <h3>{comic.title}</h3>
                <p>{comic.description || comic.textObjects[0]?.text || 'No description available.'}</p>
            </div>
            {token && <img 
                src={wishlistIcon} 
                alt="Wishlist Icon" 
                onClick={handleWishlistToggle} 
                className="wishlist-image" 
            />
            }
        </div>
    );
};

export default ComicCard;
