import React, { useEffect } from 'react';
import './LaunchAnimation.css'; // Import the CSS for styling
import 'animate.css';
import logo from '../../assets/marvel_logo.png';
import bg from '../../assets/red_bg.png';


const LaunchAnimation = ({ onFinished }) => {
    useEffect(() => {
        // Set a timeout for the length of your animation
        const timer = setTimeout(() => {
            onFinished(); // Call the callback function when the animation ends
        }, 2000); // Adjust time to the length of your animation

        return () => clearTimeout(timer);
    }, [onFinished]);

    return (
        <div className={`animation-container`}>
          <div className="bg">
            <img src={bg} alt="Bg"/>
            </div>  
          <div className="logo">
            <img src={logo} alt="Logo"/>
          </div>
          <div className='copyright'>
            <p>Marvel, and all related characters and elements © & ™Marvel. 2024. All Rights Reserved.</p>
          </div>
        </div>
    );
};

export default LaunchAnimation;
