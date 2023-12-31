import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For programmatically navigating
import CharacterSearch from '../../components/CharacterSearch/CharacterSearch';
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker';
import ComicDisplay from '../../components/ComicDisplay/ComicDisplay';
import { fetchComics } from '../../api/api';
import './Home.css';
import account from '../../assets/account_icon.png';

const Home = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [yearRange, setYearRange] = useState({ startYear: '', endYear: '' });
    const [comics, setComics] = useState([]);
    const [isFetched, setIsFetched] = useState(false); // To track if fetch was attempted
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem('token');
    const comicsPerPage = 10;    
    const totalComics = 50;
    const navigate = useNavigate();

    // Retrieve authentication status and saved comics from local storage
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

    // Redirects to login or register page, saving comics if any are fetched
    const handleLogInOrRegister = (path) => {
        if (comics.length > 0) {localStorage.setItem('savedComics', JSON.stringify(comics))};
        navigate(path);
    };

    // Log out user and clear related information from local storage
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Clear username from local storage
        setIsLoggedIn(false);
        setUsername('');
        navigate('/'); // Navigate to home or login page after logout
    };
    
    // Sets the selected character state
    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    // Update the yearRange state with the new start and end years
    const handleYearRangeChange = (startYear, endYear) => {
        setYearRange({ startYear, endYear });
    };

    // Fetch comics based on selected character and year range
    const handleFetchComics = async () => {
        if (!selectedCharacter) {
            alert('Please select a character.');
            return;
        }
        if (comics.length === 0) {setLoading(true)};
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

        const fetchedComics = await fetchComics(selectedCharacter.id, startDate, endDate, totalComics);
        setComics(fetchedComics);
        setIsFetched(true); // Indicate that fetch was attempted
        setCurrentPage(1); // Reset to first page
        setLoading(false);
    };

    // Function to handle the 'Previous' button click
    const handlePreviousPage = () => {
        // Update the current page to the previous one, but never go below 1
        setCurrentPage(currentPage => Math.max(1, currentPage - 1));
    };

    // Function to handle the 'Next' button click
    const handleNextPage = () => {
        // Calculate the total number of pages
        const totalPages = Math.ceil(comics.length / comicsPerPage);
        // Update the current page to the next one, but do not exceed the total pages
        setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1));
    };

    // Calculate the index of the last comic on the current page
    const indexOfLastComic = currentPage * comicsPerPage;
    // Calculate the index of the first comic on the current page
    const indexOfFirstComic = indexOfLastComic - comicsPerPage;
    // Extract the comics to be displayed on the current page
    const currentComics = comics.slice(indexOfFirstComic, indexOfLastComic);

    return (
        <div>
           {!isLoggedIn ? (
                <div className='account'>
                    <p>*If you would like to add comics to your wishlist, login to your account or register for a new account.</p>
                    <button onClick={() => handleLogInOrRegister('/login')}>Login</button>
                    <button onClick={() => handleLogInOrRegister('/register')}>Register</button>
                </div>
            ) : (
                <div className='logged-in'>
                    <img src={account} alt="Account"/>
                    <Link to="/wishlist"><p className='view-wishlist'>My Wishlist</p></Link>
                    <p className='text'>Logged in as {username}</p>
                    <button onClick={handleLogout} className='button'>Logout</button>
                </div>
            )}

            <h1>Who is Your Favourite Superhero?</h1>
            <CharacterSearch onSelectCharacter={handleCharacterSelect} />
            <DateRangePicker onYearRangeChange={handleYearRangeChange} />
            <button onClick={handleFetchComics}>Generate Comics</button>
            {loading && <div className="loader"></div>}
            {isFetched && comics.length === 0 && <p className='no-comics'>No comics found for the selected criteria.</p>}
            {comics.length > 0 && <ComicDisplay comics={currentComics} token={token} />}
            {comics.length > 0 && <div className="pagination">
                {currentPage !== 1 && <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>}
                <span>Page {currentPage}</span>
                {currentPage * comicsPerPage < comics.length && <button onClick={handleNextPage} disabled={currentPage * comicsPerPage >= comics.length}>Next</button>}
            </div>}
        </div>
    );
};

export default Home;
