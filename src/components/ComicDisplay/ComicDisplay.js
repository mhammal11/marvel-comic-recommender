// src/components/ComicDisplay/ComicDisplay.js
import React from 'react';
import './ComicDisplay.css';

const ComicDisplay = ({ comics }) => {
    return (
        <div className="comic-display">
            {comics.map(comic => (
                <div key={comic.id} className="comic-card">
                    <img 
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                        alt={comic.title} 
                        className="comic-image"
                    />
                    <div className="comic-info">
                        <h3>{comic.title}</h3>
                        <p>{comic.description || comic.textObjects[0]?.text || 'No description available.'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ComicDisplay;
