
import React, { } from 'react';
import './Dropdown.css';

const JobDropdown = ({ jobType, handleChange }) => {
    const options = ['full-time', 'part-time']

    return (
        <div className="dropdown-container">
            <select name='jobType' value={jobType} onChange={(e) => handleChange(e)}
                className="dropdown-button">
                <option >Select</option>
                {options.map((option, index) => (
                    <option key={index} value={option}
                        className="dropdown-list" > {option} </option>
                ))}
            </select>
        </div>
    );
};

export { JobDropdown };
