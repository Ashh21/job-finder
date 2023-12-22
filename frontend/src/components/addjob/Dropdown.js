
import React, { } from 'react';
import './Dropdown.css';

const Dropdown = ({ jobPref, setJobPref }) => {
    const options = ['Remote', 'Office']

    return (
        <div className="dropdown-container">
            <select name='jobPref' value={jobPref} onChange={(e) => setJobPref(e.target.value)}
                className="dropdown-button">
                <option >Select</option>
                {options.map((option, index) => (
                    <option className='dropdown-list'
                        key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { Dropdown };
