import React, { useState } from 'react';
import CharacterSearch from '../components/CharacterSearch/CharacterSearch';
import DateRangePicker from '../components/DateRangePicker/DateRangePicker';
import ComicDisplay from '../components/ComicDisplay/ComicDisplay';
import { fetchComics } from '../api/api';
import './Home.css';

const Home = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [yearRange, setYearRange] = useState({ startYear: '', endYear: '' });
    const [comics, setComics] = useState([]);
    const [isFetched, setIsFetched] = useState(false); // To track if fetch was attempted

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    const handleYearRangeChange = (startYear, endYear) => {
        setYearRange({ startYear, endYear });
    };

    const handleFetchComics = async () => {
        if (!selectedCharacter) {
            alert('Please select a character.');
            return;
        }
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today.getDate();
        const currentDate = year + "-" + month + "-" + date;
        let startDate = '1800-01-01', endDate = currentDate;

        if (yearRange.startYear && yearRange.endYear) {
            if (yearRange.startYear > yearRange.endYear) {
                alert('Please enter a valid year range (e.g., 1960-1990)');
                return;
            }
            startDate = `${yearRange.startYear}-01-01`;
            endDate = `${yearRange.endYear}-12-31`;
        }

        const fetchedComics = await fetchComics(selectedCharacter.id, startDate, endDate);
        setComics(fetchedComics);
        setIsFetched(true); // Indicate that fetch was attempted
    };

    return (
        <div>
            <h1>Marvel Comics Recommender</h1>
            <CharacterSearch onSelectCharacter={handleCharacterSelect} />
            <DateRangePicker onYearRangeChange={handleYearRangeChange} />
            <button onClick={handleFetchComics}>Fetch Comics</button>
            {isFetched && comics.length === 0 && <p>No comics found for the selected criteria.</p>}
            {comics.length > 0 && <ComicDisplay comics={comics} />}
        </div>
    );
};

export default Home;
