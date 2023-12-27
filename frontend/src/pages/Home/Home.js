import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatically navigating
import CharacterSearch from '../../components/CharacterSearch/CharacterSearch';
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker';
import ComicDisplay from '../../components/ComicDisplay/ComicDisplay';
import { fetchComics } from '../../api/api';
import './Home.css';

const Home = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [yearRange, setYearRange] = useState({ startYear: '', endYear: '' });
    const [comics, setComics] = useState([]);
    const [isFetched, setIsFetched] = useState(false); // To track if fetch was attempted
    const token = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const savedComics = localStorage.getItem('savedComics');
        if (token && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }

        if (savedComics) {
            setComics(JSON.parse(savedComics));
            localStorage.removeItem('savedComics'); // Clear saved comics from local storage
        }
    }, []);

    const handleLogInOrRegister = (path) => {
        if (comics.length > 0) {localStorage.setItem('savedComics', JSON.stringify(comics))};
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Clear username from local storage
        setIsLoggedIn(false);
        setUsername('');
        navigate('/'); // Navigate to home or login page after logout
    };
    
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
           {!isLoggedIn ? (
                <div>
                    <p>If you would like to add comics to your wishlist, login to your account or register for a new account.</p>
                    <button onClick={() => handleLogInOrRegister('/login')}>Login</button>
                    <button onClick={() => handleLogInOrRegister('/register')}>Register</button>
                </div>
            ) : (
                <div>
                    <p>Logged in as {username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}

            <h1>Who is Your Favourite Superhero?</h1>
            <CharacterSearch onSelectCharacter={handleCharacterSelect} />
            <DateRangePicker onYearRangeChange={handleYearRangeChange} />
            <button onClick={handleFetchComics}>Generate Comics</button>
            {isFetched && comics.length === 0 && <p>No comics found for the selected criteria.</p>}
            {comics.length > 0 && <ComicDisplay comics={comics} token={token} />}
        </div>
    );
};

export default Home;
