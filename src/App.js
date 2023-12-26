// src/App.js
import Header from './components/Header/Header';
import Home from './pages/Home';
import LaunchAnimation from './components/LaunchAnimation/LaunchAnimation';
import React, { useState, useEffect } from 'react'; 


const App = () => {
    const [animationFinished, setAnimationFinished] = useState(false);

    return (
        <div>
            {!animationFinished && 
                <LaunchAnimation onFinished={() => setAnimationFinished(true)} />}
            {animationFinished && <Header />}
            {animationFinished && <Home />}
        </div>
      
    );
};

export default App;
