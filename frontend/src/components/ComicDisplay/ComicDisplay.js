// src/components/ComicDisplay/ComicDisplay.js
import React from 'react';
import './ComicDisplay.css';
import ComicCard from '../ComicCard/ComicCard';

const ComicDisplay = ({ comics, token }) => {
    // Renders a div containing a list of ComicCard components
    // Each ComicCard is passed a single comic's data and the authentication token
    return (
        <div className="comic-display">
            {comics.map(comic => (
                <ComicCard key={comic.id} comic={comic} token={token} />
            ))}
        </div>
    );
};

export default ComicDisplay;
