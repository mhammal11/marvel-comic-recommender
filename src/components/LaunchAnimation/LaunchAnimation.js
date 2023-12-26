import React, { useEffect, useState } from 'react';
import './LaunchAnimation.css'; // Import the CSS for styling
import 'animate.css';
import logo from '../../assets/marvel_logo.png';
import bg from '../../assets/red_bg.png';


const LaunchAnimation = ({ onFinished }) => {
    const [animationEnd, setAnimationEnd] = useState(false);

    useEffect(() => {
        // Set a timeout for the length of your animation
        const timer = setTimeout(() => {
            setAnimationEnd(true);
            onFinished(); // Call the callback function when the animation ends
        }, 2000); // Adjust time to the length of your animation

        return () => clearTimeout(timer);
    }, [onFinished]);

    return (
        <div className={`animation-container`}>
          {/* <h1 class="animate__animated animate__fadeOut">MARVEL COMICS</h1> */}
          <div className="bg">
            <img src={bg} alt="Bg"/>
            </div>  
          <div className="logo">
            <img src={logo} alt="Logo"/>
          </div>
            {/* <div className="logo">Your Logo</div> */}
        </div>
    );
};

export default LaunchAnimation;
