import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import LaunchAnimation from './components/LaunchAnimation/LaunchAnimation';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    const [animationFinished, setAnimationFinished] = useState(false);

    return (
        <AuthProvider>
            <Router>
                <div>
                    {!animationFinished && 
                        <LaunchAnimation onFinished={() => setAnimationFinished(true)} />}
                    {animationFinished && (
                        <>
                            <Header />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Routes>
                        </>
                    )}
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
