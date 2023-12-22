
import React, { } from 'react';
import './Dropdown.css';

const JobDropdown = ({ jobType, setJobType }) => {
    const options = ['full-time', 'part-time']

    return (
        <div className="dropdown-container">
            <select name='jobType' value={jobType} onChange={(e) => setJobType(e.target.value)}
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
