
import React, { useState } from 'react';
import './Dropdown.css';

const JobDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-button" onClick={toggleDropdown}>
                <p>Select</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M0.223254 0.228937C0.372089 0.0763124 0.548311 0 0.751918 0C0.955526 0 1.13155 0.0763124 1.27999 0.228937L5.64087 4.70084L10.0166 0.213675C10.1556 0.0712249 10.3292 0 10.5376 0C10.7459 0 10.9245 0.0763124 11.0734 0.228937C11.2222 0.381562 11.2966 0.56227 11.2966 0.771061C11.2966 0.979851 11.2222 1.16036 11.0734 1.31257L6.05761 6.44077C5.99808 6.50182 5.93358 6.54516 5.86413 6.5708C5.79467 6.59645 5.72025 6.60906 5.64087 6.60866C5.56149 6.60866 5.48708 6.59583 5.41762 6.57019C5.34816 6.54455 5.28367 6.50141 5.22413 6.44077L0.208371 1.29731C0.0694568 1.15486 6.73332e-07 0.979241 6.73332e-07 0.77045C6.73332e-07 0.561659 0.0744178 0.381155 0.223254 0.228937Z" fill="#9C9C9C" />
                </svg>
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    <ul>
                        <li>full</li>
                        <li>part-time</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export { JobDropdown };
