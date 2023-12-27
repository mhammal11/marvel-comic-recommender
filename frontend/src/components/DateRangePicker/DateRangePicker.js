import React, { useState, useEffect } from 'react';
import './DateRangePicker.css';

const DateRangePicker = ({ onYearRangeChange }) => {
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [prevYearRange, setPrevYearRange] = useState({ startYear: '', endYear: '' });

    useEffect(() => {
        // Only call onYearRangeChange if both years are provided and different from previous values
        if (startYear !== prevYearRange.startYear || endYear !== prevYearRange.endYear) {
            onYearRangeChange(startYear, endYear);
            setPrevYearRange({ startYear, endYear });
        }
    }, [startYear, endYear, prevYearRange, onYearRangeChange]);

    return (
        <div className="year-range-picker">
            <input 
                type="text"
                placeholder="Start Year (e.g., 1960)"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
            />

            <input 
                type="text"
                placeholder="End Year (e.g., 1990)"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
            />
        </div>
    );
};

export default DateRangePicker;
