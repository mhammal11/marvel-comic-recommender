import React, { useState, useEffect } from 'react';
import './CharacterSearch.css';
import { fetchCharacters } from '../../api/api';

const CharacterSearch = ({ onSelectCharacter }) => {
    const [query, setQuery] = useState('');
    const [characters, setCharacters] = useState([]);
    const [isSelectionMade, setIsSelectionMade] = useState(false);

    useEffect(() => {
        if (query.length > 2 && !isSelectionMade) {
            const loadCharacters = async () => {
                const results = await fetchCharacters(query);
                setCharacters(results);
            };

            loadCharacters();
        } else if (!isSelectionMade) {
            setCharacters([]);
        }
    }, [query, isSelectionMade]);

    const handleSelect = (character) => {
        setQuery(character.name);
        onSelectCharacter(character);
        setCharacters([]);
        setIsSelectionMade(true);
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        setIsSelectionMade(false);
    };

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
