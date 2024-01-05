import React, { useState, useEffect } from 'react';
import './CharacterSearch.css';
import { fetchCharacters } from '../../api/api';

// Component for character search functionality
const CharacterSearch = ({ onSelectCharacter }) => {
    // State for search query, character results, and selection flag
    const [query, setQuery] = useState('');
    const [characters, setCharacters] = useState([]);
    const [isSelectionMade, setIsSelectionMade] = useState(false);

    // useEffect to fetch characters when query changes and no selection is made
    useEffect(() => {
        if (query.length > 2 && !isSelectionMade) {
            // Load characters from API based on the query
            const loadCharacters = async () => {
                const results = await fetchCharacters(query);
                setCharacters(results);
            };

            loadCharacters();
        } else if (!isSelectionMade) {
            // Clear characters if no selection is made
            setCharacters([]);
        }
    }, [query, isSelectionMade]);

    // Function to handle character selection
    const handleSelect = (character) => {
        setQuery(character.name); // Update query with character name
        onSelectCharacter(character); // Trigger callback with selected character
        setCharacters([]); // Clear character list
        setIsSelectionMade(true); // Set selection flag
    };

    // Function to handle changes in the search input
    const handleChange = (e) => {
        setQuery(e.target.value); // Update query based on input
        setIsSelectionMade(false); // Reset selection flag
    };

    // Render character search input and results list
    return (
        <div className="character-search">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for a Marvel character..."
            />
            {characters.length > 0 && (
                <ul className="character-list">
                    {characters.map((character) => (
                        <li key={character.id} onClick={() => handleSelect(character)}>
                            {character.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CharacterSearch;
